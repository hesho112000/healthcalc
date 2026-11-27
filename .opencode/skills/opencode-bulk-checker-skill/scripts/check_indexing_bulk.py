import requests
import xml.etree.ElementTree as ET
import csv
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter

SITEMAP_URL = "https://healthfingerprint.com/sitemap.xml"
OUTPUT_CSV = "healthfingerprint_index_audit.csv"

HEADERS_GOOGLE = {
    "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}

def get_urls_from_sitemap(url, depth=0):
    if depth > 3:
        return []
    print(f"Fetching sitemap: {url}")
    try:
        r = requests.get(url, headers=HEADERS_GOOGLE, timeout=30)
        r.raise_for_status()
        root = ET.fromstring(r.content)
    except Exception as e:
        print(f"Failed {url}: {e}")
        return []
    ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = []
    # check if sitemap index
    for sm in root.findall('ns:sitemap', ns):
        loc = sm.find('ns:loc', ns)
        if loc is not None and loc.text:
            urls.extend(get_urls_from_sitemap(loc.text.strip(), depth+1))
    # urlset
    for u in root.findall('ns:url', ns):
        loc = u.find('ns:loc', ns)
        if loc is not None and loc.text:
            urls.append(loc.text.strip())
    return urls

def check_url(url):
    try:
        # first check without redirect to detect redirect issues
        r_no = requests.get(url, headers=HEADERS_GOOGLE, timeout=15, allow_redirects=False)
        if r_no.status_code in (301,302,307,308):
            loc = r_no.headers.get('Location','')
            # if redirect loop or to same domain with different slash
            return {
                'url': url,
                'status': r_no.status_code,
                'final_url': loc,
                'issue': 'Page with redirect' if loc else 'Redirect error',
                'canonical': '',
                'title_len': 0,
                'has_desc': False
            }

        r = requests.get(url, headers=HEADERS_GOOGLE, timeout=20, allow_redirects=True)
        status = r.status_code
        final_url = r.url

        if status == 403:
            return {'url': url, 'status': 403, 'final_url': final_url, 'issue': 'Blocked due to access forbidden (403)', 'canonical': '', 'title_len': 0, 'has_desc': False}
        if status != 200:
            return {'url': url, 'status': status, 'final_url': final_url, 'issue': f'HTTP {status}', 'canonical': '', 'title_len': 0, 'has_desc': False}

        text = r.text[:30000]
        # canonical
        canonical = ''
        m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', text, re.I)
        if m:
            canonical = m.group(1)
        else:
            m2 = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', text, re.I)
            if m2:
                canonical = m2.group(1)

        tm = re.search(r'<title[^>]*>(.*?)</title>', text, re.I|re.S)
        title_len = len(tm.group(1).strip()) if tm else 0
        has_desc = 'name="description"' in text.lower()

        issue = 'OK'
        if canonical and canonical.rstrip('/') != url.rstrip('/') and canonical.rstrip('/') != final_url.rstrip('/'):
            # check if canonical points to different page
            if 'healthfingerprint.com' in canonical:
                issue = 'Alternate page with proper canonical tag'
        elif title_len < 20:
            issue = 'Crawled - currently not indexed (thin title)'
        elif not has_desc:
            issue = 'Crawled - currently not indexed (no description)'
        else:
            # for large sites, many will be Discovered if not linked internally - we mark as OK but will be Discovered in GSC if crawl budget low
            issue = 'OK - may be Discovered - currently not indexed if no internal links'

        return {'url': url, 'status': status, 'final_url': final_url, 'issue': issue, 'canonical': canonical, 'title_len': title_len, 'has_desc': has_desc}

    except Exception as e:
        return {'url': url, 'status': 0, 'final_url': '', 'issue': f'Error: {str(e)[:120]}', 'canonical': '', 'title_len': 0, 'has_desc': False}

print("1. تحميل السايت ماب...")
all_urls = get_urls_from_sitemap(SITEMAP_URL)
print(f"Found {len(all_urls)} URLs")
if not all_urls:
    print("ضع ملف sitemap.xml بجانب السكريبت")
    exit()

print("2. فحص الصفحات (10 في نفس الوقت)...")
results = []
with ThreadPoolExecutor(max_workers=10) as ex:
    futures = {ex.submit(check_url, u): u for u in all_urls}
    for i, fut in enumerate(as_completed(futures)):
        res = fut.result()
        results.append(res)
        if i % 50 == 0:
            print(f"{i}/{len(all_urls)} -> {res['issue']}")

# save
with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['url','status','final_url','issue','canonical','title_len','has_desc'])
    w.writeheader()
    w.writerows(results)

print(f"\nتم الحفظ في {OUTPUT_CSV}")
c = Counter([r['issue'] for r in results])
print("\nالملخص:")
for k,v in c.most_common():
    print(f"{k}: {v}")
