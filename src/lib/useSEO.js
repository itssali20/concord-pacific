import { useLayoutEffect } from 'react'
import { SITE_URL, SITE_NAME, seoFor, jsonLdFor, imageUrl, altFor } from '../data/seo'

function setMeta(attr, key, content) {
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

/** Applies the page's title, description, canonical, social tags and structured data from src/data/seo.js. */
export default function useSEO(path) {
  useLayoutEffect(() => {
    const s = seoFor(path)
    const url = `${SITE_URL}${s.path === '/' ? '/' : s.path}`
    const img = imageUrl(s.image)

    document.title = s.title
    setMeta('name', 'description', s.description)
    setMeta('name', 'robots', s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    if (s.noindex) document.head.querySelector('link[rel="canonical"]')?.remove()
    else setLink('canonical', url)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_US')
    setMeta('property', 'og:title', s.title)
    setMeta('property', 'og:description', s.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:image:alt', altFor(s.image))

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', s.title)
    setMeta('name', 'twitter:description', s.description)
    setMeta('name', 'twitter:image', img)
    setMeta('name', 'twitter:image:alt', altFor(s.image))

    let ld = document.getElementById('ld-json')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'ld-json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(jsonLdFor(path))
  }, [path])
}
