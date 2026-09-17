import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { DEVELOPMENTS } from '../src/data/developments.js'

const SITE = 'https://concord-pacific-final.vercel.app'
const __dirname = dirname(fileURLToPath(import.meta.url))

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/developments', priority: '0.9', changefreq: 'weekly' },
  { path: '/signature-residences', priority: '0.8', changefreq: 'monthly' },
  { path: '/design-and-materials', priority: '0.8', changefreq: 'monthly' },
  { path: '/our-vision', priority: '0.7', changefreq: 'monthly' },
  { path: '/international-team', priority: '0.7', changefreq: 'monthly' },
  { path: '/company', priority: '0.7', changefreq: 'monthly' },
  { path: '/opportunities', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
]

const devRoutes = DEVELOPMENTS.map((d) => ({ path: `/developments/${d.slug}`, priority: '0.8', changefreq: 'monthly' }))

const all = [...staticRoutes, ...devRoutes]
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${all.length} URLs`)
