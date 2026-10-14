/*
 * Runs after the client and server builds. Writes a fully rendered HTML file for every
 * page (with its own title, description, canonical, social tags and structured data),
 * plus 404.html, sitemap.xml, robots.txt and an Apache .htaccess.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, '.ssr', 'entry-server.js')

const origError = console.error
console.error = (msg, ...rest) => {
  if (typeof msg === 'string' && msg.includes('useLayoutEffect does nothing on the server')) return
  origError(msg, ...rest)
}

const { render, head, ROUTES, SITE_URL, seoFor, imageUrl } = await import(pathToFileURL(ssrEntry).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo:start-->') || !template.includes('<!--app-->')) {
  throw new Error('dist/index.html is missing the <!--seo:start--> / <!--app--> placeholders')
}

const page = (url) => template
  .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(url))
  .replace('<!--app-->', render(url))

const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`)
const write = (rel, content) => {
  const out = path.join(dist, rel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, content)
}

for (const url of ROUTES) write(fileFor(url), page(url))
write('404.html', page('/404'))

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.map((url) => {
  const s = seoFor(url)
  return `  <url>
    <loc>${SITE_URL}${url === '/' ? '/' : url}</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${imageUrl(s.image)}</image:loc></image:image>
  </url>`
}).join('\n')
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`)

write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`)

write('.htaccess', `# Apache / cPanel hosting: clean URLs, real 404s and long-lived caching.
Options -MultiViews
DirectorySlash Off
ErrorDocument 404 /404.html

RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
RewriteCond %{THE_REQUEST} \\s/+index\\.html[\\s?]
RewriteRule ^ / [R=301,L]
RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?]
RewriteRule ^ /%1 [R=301,L]
RewriteCond %{THE_REQUEST} \\s/+(.+?)/+[\\s?]
RewriteRule ^ /%1 [R=301,L]
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^(.+)$ /$1.html [L]

<IfModule mod_headers.c>
  <FilesMatch "\\.(webp|jpg|png|svg|mp4|woff2|js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`)

fs.rmSync(path.join(root, '.ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${ROUTES.length} pages + 404 for ${SITE_URL}`)
