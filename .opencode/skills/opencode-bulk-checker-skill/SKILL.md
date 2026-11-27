---
name: bulk-index-checker
description: فحص شامل لـ 19 ألف صفحة لمعرفة مشاكل الأرشفة في Google Search Console - يكشف 403, redirect, canonical, thin content
---

# Bulk Index Checker - Health Fingerprint

مهارة لفحص كل صفحات الموقع مرة واحدة وحل مشاكل عدم الأرشفة في Google Search Console.

## ماذا تفعل هذه المهارة:

- تقرأ sitemap.xml كامل (حتى لو 19 ألف URL)
- تفحص كل صفحة بنفس User-Agent بتاع Googlebot
- تكشف:
  - Blocked due to 403 (مشكلة Cloudflare)
  - Redirect error / Page with redirect
  - Alternate page with proper canonical tag
  - Crawled - currently not indexed (thin content)
  - Discovered - currently not indexed

## كيف تستخدمها:

عندما تقول:
- "افحص الأرشفة"
- "check indexing"
- "ليه الصفحات مش بتتأرشف"
- "افحص السايت ماب"

المهارة هتشغل scripts/check_indexing_bulk.py وتطلعلك ملف CSV بكل المشاكل.

## المتطلبات:
pip install requests
