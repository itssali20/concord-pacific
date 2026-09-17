import { useLayoutEffect } from 'react'

const SITE = 'https://concord-pacific-final.vercel.app'
const SITE_NAME = 'Concord Pacific, Corp.'
const DEFAULT_IMAGE = `${SITE}/images/estate-grand.webp`

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Sets per-page title, meta description, canonical URL, Open Graph and
 * Twitter Card tags. Call once per route with plain strings (no JSX).
 */
export default function useSEO({ title, description, path = '', image, noindex, jsonLd }) {
  useLayoutEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Exceptional Properties. Extraordinary Living.`
    const url = `${SITE}${path}`
    const img = image ? `${SITE}${image}` : DEFAULT_IMAGE

    document.title = fullTitle
    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)

    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    const ldId = 'ld-page'
    if (jsonLd) setJsonLd(ldId, jsonLd)
    else { const el = document.getElementById(ldId); if (el) el.remove() }
  }, [title, description, path, image, noindex, jsonLd])
}

export { SITE, SITE_NAME }
