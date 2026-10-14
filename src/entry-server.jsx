import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { SITE_URL, SITE_NAME, ROUTES, seoFor, jsonLdFor, imageUrl, altFor } from './data/seo'
import { imgSrc, HERO_SLIDES } from './data/site'

export { ROUTES, SITE_URL, seoFor, imageUrl }

export function render(url) {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>)
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function head(url) {
  const s = seoFor(url)
  const canonical = `${SITE_URL}${s.path === '/' ? '/' : s.path}`
  const img = imageUrl(s.image)
  const alt = altFor(s.image)
  const env = import.meta.env
  const tags = [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="robots" content="${s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
  ]
  if (!s.noindex) tags.push(`<link rel="canonical" href="${esc(canonical)}" />`)
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:alt" content="${esc(alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    `<meta name="twitter:image:alt" content="${esc(alt)}" />`,
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(jsonLdFor(url)).replace(/</g, '\\u003c')}</script>`,
  )
  if (s.path === '/') {
    const hero = imgSrc(HERO_SLIDES[0].img)
    tags.push(`<link rel="preload" as="image" href="${hero.src}"${hero.srcSet ? ` imagesrcset="${hero.srcSet}" imagesizes="${hero.sizes}"` : ''} fetchpriority="high" />`)
  }
  if (env.VITE_GSC_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(env.VITE_GSC_VERIFICATION)}" />`)
  if (env.VITE_BING_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${esc(env.VITE_BING_VERIFICATION)}" />`)
  if (env.VITE_GA_ID) {
    const id = esc(env.VITE_GA_ID)
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');</script>`,
    )
  }
  return tags.join('\n    ')
}
