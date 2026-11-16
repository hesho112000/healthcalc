"""Create centered 800px WebP recipe images from public/images/raw.

Requires Pillow (python -m pip install Pillow).
"""

from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "public" / "images" / "raw"
OUTPUT_DIR = ROOT / "public" / "images" / "recipes"
MAX_BYTES = 80_000
OUTPUT_NAMES = {
    "classic-cheeseburger": "classic-cheeseburger.webp",
    "buffalo-chicken-wings": "buffalo-chicken-wings.webp",
    "macaroni-and-cheese": "macaroni-and-cheese.webp",
    "buttermilk-pancakes": "buttermilk-pancakes.webp",
    "grilled-chicken-caesar-salad": "grilled-chicken-caesar-salad.webp",
    "lentil-soup-with-cumin": "moroccan-lentil-soup.webp",
}
SUPPORTED = {".jpg", ".jpeg", ".webp"}


def main() -> None:
    sources = sorted(
        path for path in RAW_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED
    )
    if not sources:
        raise SystemExit(f"No supported images found in {RAW_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    processed = set()

    for source in sources:
        output_name = OUTPUT_NAMES.get(source.stem.lower())
        if output_name is None:
            raise SystemExit(f"No output filename configured for {source.name}")

        with Image.open(source) as image:
            image.seek(0)
            image = ImageOps.exif_transpose(image).convert("RGB")
            square = ImageOps.fit(
                image,
                (800, 800),
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            )

        destination = OUTPUT_DIR / output_name
        size = 0
        for blur_radius in (0, 0.7, 1.0, 1.2):
            optimized = square if blur_radius == 0 else square.filter(
                ImageFilter.GaussianBlur(blur_radius)
            )
            optimized.save(destination, format="WEBP", quality=75, method=6)
            size = destination.stat().st_size
            if size < MAX_BYTES:
                break
        else:
            destination.unlink(missing_ok=True)
            raise SystemExit(
                f"{destination.name} is {size} bytes; required size is below {MAX_BYTES}."
            )

        processed.add(output_name)
        print(
            f"{source.name} -> {destination.name}: 800x800, "
            f"quality 75, {size} bytes"
        )

    expected = set(OUTPUT_NAMES.values())
    if processed != expected:
        missing = sorted(expected - processed)
        raise SystemExit(f"Missing expected outputs: {', '.join(missing)}")


if __name__ == "__main__":
    main()
