```bash
npm run dev
```

## Deploy notes (S3 / CloudFront)

- **Canonical host:** Site metadata and `sitemap.xml` use `https://www.japancarspecs.com`. Redirect apex → `www` (or change `lib/site.ts` if your primary host is the apex).
- **404 for unknown URLs:** Configure CloudFront **custom error responses** so **403** and **404** from the origin return your static **`404.html`** with HTTP **404** (otherwise browsers may see raw S3 XML `AccessDenied`).
- After deploy, submit **`https://www.japancarspecs.com/sitemap.xml`** in Google Search Console.
