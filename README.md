# BackGen website

Static HTML, CSS and JavaScript for https://backgen.co.za/.
Cloudflare publishes the repository’s main branch. No build command is required.

## Local preview

Run `python -m http.server 8080` from this directory and open http://localhost:8080/.

## Search and AI discovery

- `robots.txt` allows public crawling and points to the XML sitemap.
- `sitemap.xml` lists the four canonical public pages. Add or remove entries when pages change. Use `/` for the homepage, not `/index.html`.
- `llms.txt` summarises the company and links to its public information. Keep services and contact details consistent with the pages.
- Each HTML page links to the sitemap and llms.txt in its head.

After deployment, check these files return HTTP 200 at the production domain. Submit https://backgen.co.za/sitemap.xml in Google Search Console if you manage that property. These discovery files do not guarantee indexing or AI citations.
