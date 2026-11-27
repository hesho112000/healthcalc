
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))
from check_indexing_bulk import get_urls_from_sitemap, check_url
from concurrent.futures import ThreadPoolExecutor, as_completed
import csv
from collections import Counter

SITEMAP = sys.argv[1] if len(sys.argv) > 1 else "https://healthfingerprint.com/sitemap.xml"

print(f"فحص {SITEMAP}")
urls = get_urls_from_sitemap(SITEMAP)
print(f"Found {len(urls)} URLs")

results = []
with ThreadPoolExecutor(max_workers=10) as ex:
    futures = {ex.submit(check_url, u): u for u in urls}
    for i, fut in enumerate(as_completed(futures)):
        res = fut.result()
        results.append(res)
        if i % 50 == 0:
            print(f"{i}/{len(urls)} -> {res['issue']}")

with open("healthfingerprint_index_audit.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=['url','status','final_url','issue','canonical','title_len','has_desc'])
    w.writeheader()
    w.writerows(results)

print("تم! الملف: healthfingerprint_index_audit.csv")
c = Counter([r['issue'] for r in results])
for k,v in c.most_common():
    print(f"{k}: {v}")
