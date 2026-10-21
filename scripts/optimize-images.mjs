import { existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const inputPath = fileURLToPath(new URL('../public/assets/body-map.png', import.meta.url));
const outputPath = fileURLToPath(new URL('../public/assets/body-map.webp', import.meta.url));

if (!existsSync(inputPath)) {
  console.error(`Source image not found: ${inputPath}`);
  process.exit(1);
}

// ffmpeg's SVG support varies by build, but PNG -> WebP is universally available.
const ffmpeg = spawnSync(
  'ffmpeg',
  ['-hide_banner', '-y', '-i', inputPath, '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6', outputPath],
  { stdio: 'inherit' },
);

if (ffmpeg.status !== 0 || !existsSync(outputPath)) {
  console.warn('ffmpeg is unavailable or failed; the PNG fallback will continue to be used.');
  process.exit(0);
}

const [png, webp] = await Promise.all([stat(inputPath), stat(outputPath)]);
const reduction = (1 - webp.size / png.size) * 100;
console.log(
  `Optimized body-map: ${(png.size / 1024).toFixed(1)}KB PNG -> ${(webp.size / 1024).toFixed(1)}KB WebP (${reduction.toFixed(1)}% smaller)`,
);
