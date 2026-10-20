/*
 * SEO SETTINGS — the one file to edit for search-engine titles, descriptions,
 * social-share images and image alt text. Changes go live on the next deploy.
 *
 * Domain: set the VITE_SITE_URL environment variable (e.g. https://www.yourdomain.com)
 * when the site moves to the company domain. Canonical URLs, the sitemap, robots.txt
 * and social tags all follow it automatically.
 */
import { DEVELOPMENTS } from './developments'
import { CONTACT } from './site'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://master-craft-international.vercel.app').replace(/\/+$/, '')
export const SITE_NAME = 'Master Craft International — a division of Concord Pacific Corp.'
export const BRAND = 'Master Craft International'
export const PARENT = 'Concord Pacific Corp.'
export const DEFAULT_IMAGE = 'estate-grand'

/* Per-page settings. Keep titles under ~60 characters and descriptions under ~160. */
export const PAGES = {
  '/': {
    title: 'Luxury Real Estate Developer in Beverly Hills | Master Craft International',
    description: 'Master Craft International, a division of Concord Pacific Corp., is a Beverly Hills real estate developer creating exceptional private estates and luxury condominium residences in Beverly Hills, Bel-Air and Greater Los Angeles.',
    image: 'estate-pool-sunset',
    crumb: 'Home',
  },
  '/developments': {
    title: 'Luxury Estates & Condominium Developments | Master Craft International',
    description: 'Explore the Master Craft International portfolio — private estates and condominium residences in Beverly Hills, Bel-Air and Greater Los Angeles.',
    image: 'estate-heritage',
    crumb: 'Developments',
    type: 'CollectionPage',
  },
  '/signature-residences': {
    title: 'Signature Residences & Luxury Interiors | Master Craft International',
    description: 'Signature interiors, chef’s kitchens, primary suites and indoor-outdoor living spaces across Master Craft International luxury residences in Beverly Hills and Bel-Air.',
    image: 'interior-great-room',
    crumb: 'Signature Residences',
  },
  '/design-and-materials': {
    title: 'Design & Materials | Master Craft International',
    description: 'Kitchens, bathrooms, hardwood flooring, natural stone, millwork, lighting and landscape — the materials and craftsmanship behind every Master Craft International residence.',
    image: 'interior-great-room',
    crumb: 'Design & Materials',
  },
  '/our-vision': {
    title: 'Our Vision & Development Philosophy | Master Craft International',
    description: 'Vision creates value. The principles behind Master Craft International, a division of Concord Pacific Corp. — exceptional locations, architectural integrity, uncompromising quality and enduring value.',
    image: 'estate-viewpoint',
    crumb: 'Our Vision',
  },
  '/international-team': {
    title: 'International Team of Architects & Builders | Master Craft International',
    description: 'Led by CEO Roman Alexander, Master Craft International unites award-winning architects, engineers, interior designers and builders from the United States and abroad.',
    image: 'construction-team',
    crumb: 'International Team',
  },
  '/company': {
    title: 'About Master Craft International — Concord Pacific Corp.',
    description: 'Master Craft International, a division of Concord Pacific Corp., is headquartered in Beverly Hills, developing exceptional private estates and condominium residences across Greater Los Angeles.',
    image: 'loc-beverly-hills-entry',
    crumb: 'Company',
    type: 'AboutPage',
  },
  '/building-materials': {
    title: 'Building Materials & Architectural Products | Master Craft International',
    description: 'Roofing materials, interior and exterior doors, sliding and folding glass doors and more — quality building products from the USA and internationally.',
    image: 'roof-modern-farmhouse',
    crumb: 'Building Materials & Distribution',
  },
  '/opportunities': {
    title: 'Development Opportunities & Joint Ventures | Master Craft International',
    description: 'A discreet acquisition and partnership practice for property owners, brokers, investors and joint-venture partners in Beverly Hills, Bel-Air and Los Angeles.',
    image: 'estate-summit',
    crumb: 'Opportunities',
  },
  '/contact': {
    title: 'Contact Master Craft International | Beverly Hills, CA',
    description: 'Contact Master Craft International, a division of Concord Pacific Corp., in Beverly Hills about developments, residences, building materials or partnerships. All inquiries are handled in confidence.',
    image: 'estate-pool-tall',
    crumb: 'Contact',
    type: 'ContactPage',
  },
}

const NOT_FOUND = {
  title: 'Page Not Found | Master Craft International',
  description: 'This page could not be found.',
  image: 'estate-horizon',
  noindex: true,
}

/* Alt text for every site image, used wherever the image appears. */
export const IMAGE_ALT = {
  'amenity-lobby': 'Marble-clad residential lobby with concierge desk',
  'amenity-rooftop-pool': 'Rooftop pool with cabanas and fire feature overlooking the Los Angeles skyline',
  'arch-timeless': 'Contemporary glass-and-stone residence illuminated at dusk',
  'condo-bath': 'Condominium primary bathroom with freestanding tub and city views',
  'condo-bedroom': 'Condominium bedroom with floor-to-ceiling windows over the city',
  'condo-facade': 'Beverly Hills condominium building facade with planted terraces',
  'condo-living': 'Open-plan condominium living room with skyline views',
  'condo-rooftop-pool': 'Condominium rooftop infinity pool at sunset',
  'condo-sunset': 'Beverly Hills condominium residences at sunset',
  'construction-plans': 'Master Craft International team reviewing construction plans on site',
  'construction-site': 'Engineers reviewing drawings at a construction site',
  'construction-team-tall': 'Development team reviewing plans on a construction site above Los Angeles',
  'construction-team': 'Master Craft International architects and builders reviewing plans on site',
  'estate-fire-terrace': 'Bel-Air estate pool terrace with sunken fire lounge',
  'estate-grand': 'Terraced Beverly Hills estate with infinity pool overlooking the city',
  'estate-heritage': 'Modern classic estate with reflecting pool and palm trees',
  'estate-horizon': 'Hillside estate with fire pit and pool overlooking Los Angeles at dusk',
  'estate-oakridge': 'Multi-level contemporary estate with landscaped terraces and pool',
  'estate-pool-sunset': 'Contemporary Beverly Hills estate with infinity pool at sunset',
  'estate-pool-tall': 'Luxury estate pool terrace with fire lounge at dusk',
  'estate-reserve': 'Contemporary estate entrance framed by olive trees',
  'estate-stairs-tall': 'Illuminated grand stair leading to a contemporary estate and pool',
  'estate-summit': 'Hilltop estate with infinity pool overlooking Los Angeles',
  'estate-viewpoint': 'Terraced hillside estate with pool and canyon views',
  'indoor-outdoor-terrace': 'Indoor-outdoor living room opening to a terrace at sunset',
  'interior-bedroom-view': 'Primary bedroom with panoramic city views at sunset',
  'interior-closet': 'Boutique-style walk-in closet with illuminated wood millwork',
  'interior-great-room': 'Double-height great room with chandelier, fireplace and curved staircase',
  'interior-kitchen': 'Chef’s kitchen with marble waterfall island and pendant lighting',
  'interior-living': 'Double-height living room with sculptural chandelier and city views',
  'interior-penthouse': 'Penthouse living room with grand piano and skyline views',
  'interior-primary-suite': 'Primary suite with vaulted ceiling and terrace views',
  'interior-theater': 'Private home theater with lounge seating',
  'interior-wine-dining': 'Wine gallery with glass-fronted wine storage and dining area',
  'landscape-garden': 'Illuminated landscape garden with olive trees and stone steps',
  'loc-bel-air': 'Contemporary residential building in Bel-Air',
  'loc-beverly-grove': 'Terraced residential building overlooking Beverly Grove at sunset',
  'loc-beverly-hills-entry': 'Beverly Hills residence entry with palm trees and reflecting pool',
  'loc-beverly-hills': 'Curved-balcony residential tower in Beverly Hills',
  'loc-brentwood': 'Residential building with landscaped terraces in Brentwood',
  'loc-century-city': 'Twin glass residential towers in Century City',
  'loc-culver-city': 'Modern residential building in Culver City',
  'loc-downtown-la': 'Glass residential tower in Downtown Los Angeles',
  'loc-hollywood-hills': 'Residential tower in the Hollywood Hills at sunset',
  'loc-la-skyline-pool': 'Rooftop pool overlooking the Los Angeles skyline',
  'loc-los-angeles': 'Cylindrical glass residential tower in Los Angeles',
  'loc-marina-del-rey': 'Wave-form residential building in Marina del Rey',
  'loc-santa-monica': 'Glass residential tower in Santa Monica',
  'loc-west-hollywood': 'Residential building with balconies in West Hollywood',
  'materials-door-collage': 'Selection of luxury interior and exterior doors in wood and metal',
  'materials-door-dark': 'Dark pivot entry door with stone surround',
  'materials-door-double-marble': 'Double contemporary entry door with marble steps',
  'materials-door-glassslat': 'Modern entry door with horizontal glass inserts',
  'materials-door-lit': 'Wood entry door with integrated lighting',
  'materials-door-panel': 'Dark entry door with geometric panel design',
  'materials-door-woodgrain': 'Walnut wood-grain pivot entry door',
  'materials-floor-closeup': 'Close-up of wide-plank light European oak hardwood flooring',
  'materials-floor-hardwood': 'Open-plan living space with wide-plank hardwood floors',
  'materials-floor-lifestyle': 'Living room with light hardwood floors and ocean views',
  'materials-floor-species': 'Hardwood flooring samples in white maple, dark birch and maple',
  'materials-garage-collage': 'Selection of contemporary garage doors in glass, wood and aluminum',
  'materials-garage-dark': 'Dark aluminum garage door with horizontal glass panels',
  'materials-garage-glass': 'Frosted glass and aluminum garage door',
  'materials-glass-oceanview': 'Living room with folding glass walls open to an ocean view',
  'materials-glass-pool': 'Living room with sliding glass walls opening to a pool',
  'materials-glass-sliding-collage': 'Sliding and folding glass door systems in luxury homes',
  'materials-glass-sunset': 'Floor-to-ceiling sliding glass doors with sunset view',
  'materials-kitchen-bar': 'Luxury kitchen and bar with custom cabinetry',
  'materials-kitchen-cream': 'Cream custom kitchen cabinetry with range hood',
  'materials-kitchen-island': 'Kitchen island with cream cabinetry and pendant lights',
  'materials-kitchen-marble': 'Modern kitchen with marble waterfall island',
  'materials-kitchen-walnut': 'Walnut kitchen cabinetry with large island',
  'materials-kitchen-woodfloor': 'Cream kitchen with wood floors and built-in appliances',
  'materials-roof-exterior': 'Contemporary home with standing-seam metal roof at sunset',
  'materials-roof-mediterranean': 'Mediterranean-style metal roofing shingles in multiple colors',
  'materials-roof-swatches': 'Roof tile samples in a range of colors and finishes',
  'materials-stone': 'Natural stone, marble and bronze material samples',
  'plans-floors': 'Architectural floor plans for a residential development',
  'plans-section': 'Architectural section drawing of a condominium building',
  'team-ceo-model': 'CEO Roman Alexander reviewing a residence model with architects and designers',
  'team-ceo-office': 'Master Craft International leadership in the Beverly Hills studio',
  'team-ceo-portrait': 'Roman Alexander, CEO of Master Craft International, a division of Concord Pacific Corp.',
  'team-disciplines-overview': 'Architecture, engineering, interiors and landscape teams reviewing a residence model',
  'team-office': 'Master Craft International development team in the Beverly Hills studio',
  'team-process-overview': 'Development process: site selection, feasibility, market potential and a singular vision',
  'team-vision-reality': 'From vision to reality — construction of a residential tower at sunset',
  transformation: 'Before and after transformation of a residential property',
  'roof-modern-farmhouse': 'Modern farmhouse with a dark modular steel roof',
  'roof-mediterranean-aerial': 'Aerial view of a Mediterranean-style home with a brown barrel-tile steel roof',
  'roof-ranch-home': 'Single-story home with a brown tile-profile steel roof',
  'roof-gray-aerial': 'Aerial view of a large home with a gray flat-profile steel roof',
  'roof-night-home': 'Home with a dark steel tile roof at night',
  'roof-villa': 'Historic villa restored with a black steel tile roof',
  'roof-hip-aerial': 'Aerial view of a hip roof in dark modular steel tiles',
  'roof-brown-tile': 'Brown steel tile roof against a blue sky',
  'roof-residential-aerial': 'Aerial view of homes with gray and black steel roofs',
  'roof-slate-detail': 'Close-up of slate-profile steel roofing panels',
  'roof-profile-barrel': 'Black barrel-tile profile steel roofing panel',
  'roof-profile-barrel-sand': 'Sand-colored barrel-tile profile steel roofing panel',
  'roof-profile-classic': 'Brick-red classic tile profile steel roofing panel',
  'roof-profile-classic-silver': 'Charcoal classic tile profile steel roofing panel',
  'roof-profile-tile-green': 'Green tile-profile steel roofing panel',
  'roof-profile-modern': 'Gray modern flat-profile steel roofing panels',
  'roof-profile-modern-brown': 'Brown modern flat-profile steel roofing panels',
  'roof-profile-slate': 'Black slate-profile steel roofing panel',
  'roof-profile-slate-brown': 'Dark brown slate-profile steel roofing panel',
  'roof-profile-wood': 'Gray wood-shake profile steel roofing panel',
  'roof-profile-stone-barrel': 'Terracotta stone-coated barrel-tile steel roofing panel',
  'roof-profile-stone-slate': 'Black stone-coated slate steel roofing panel',
  'gutter-system': 'Brown steel gutter and downspout on a tile roof',
  'gutter-black': 'Black half-round steel gutter section',
  'gutter-soffit-eave': 'Black steel gutters and dark soffit panels on a home eave',
  'soffit-woodgrain': 'Wood-grain PVC soffit panels in light oak',
  'soffit-home': 'Contemporary home with dark siding and wood-tone soffits',
  'fence-steel': 'Charcoal horizontal-slat steel fence',
  'fence-walnut': 'Walnut-finish horizontal steel fence panel',
  'interior-doors-lineup': 'Four modern interior doors in white with black glass and aluminum details',
  'door-col-glass': 'Glass-insert interior doors in white and black',
  'door-col-signature': 'Signature interior doors in white, light oak and wood finishes',
  'door-col-inlay': 'Aluminum-inlay interior doors in oak, gray and concrete finishes',
  'door-col-milled': '3D-milled interior doors in dark gray, oak and white',
  'door-col-concealed': 'Concealed-frame flush interior doors',
  'door-glass-1': 'White interior door with satin glass panels',
  'door-glass-2': 'White interior door with black glass stripes',
  'door-glass-3': 'White interior door with horizontal satin glass inserts',
  'door-glass-4': 'White interior door with a tall black-framed glass panel',
  'door-signature-1': 'White interior door with a full satin glass panel',
  'door-signature-2': 'White interior door with a narrow vertical glass insert',
  'door-signature-3': 'White interior door with a framed molding panel',
  'door-signature-4': 'White interior door with a black glass frame',
  'door-inlay-1': 'White interior door with a vertical black glass inlay',
  'door-inlay-2': 'White interior door with black inlay and aluminum lines',
  'door-inlay-3': 'White interior door with a horizontal aluminum inlay',
  'door-inlay-4': 'White interior door with offset aluminum inlays',
  'door-milled-1': 'White interior door with a 3D-milled panel design',
  'door-milled-2': 'White interior door with 3D-milled diagonal lines',
  'door-milled-3': 'White interior door with a 3D-milled vertical line',
  'door-milled-4': 'White interior door with 3D-milled geometric lines',
  'door-concealed-1': 'Concealed-frame flush interior door with gray aluminum edge',
  'door-concealed-2': 'Concealed-frame flush interior door with black aluminum edge',
}

export const altFor = (img) => IMAGE_ALT[img] || ''

const clip = (text, max = 158) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/* Resolves the SEO settings for any path, including development pages and 404s. */
export function seoFor(path) {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '')
  if (PAGES[clean]) return { path: clean, ...PAGES[clean] }
  const m = clean.match(/^\/developments\/([^/]+)$/)
  const d = m && DEVELOPMENTS.find((x) => x.slug === m[1])
  if (d) {
    return {
      path: clean,
      title: `${d.name} — ${d.type} | Master Craft International`,
      description: clip(`${d.tagline} ${d.vision}`),
      image: d.hero,
      crumbs: [['Developments', '/developments'], [d.name, clean]],
      development: d,
    }
  }
  return { path: clean, ...NOT_FOUND }
}

const abs = (p) => `${SITE_URL}${p === '/' ? '/' : p}`
export const imageUrl = (img) => `${SITE_URL}/images/${img}.webp`

/* Structured data (schema.org) for a page, as a single JSON-LD graph. */
export function jsonLdFor(path) {
  const s = seoFor(path)
  const url = abs(s.path)
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    alternateName: SITE_NAME,
    parentOrganization: { '@type': 'Organization', name: PARENT },
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: imageUrl('logo-full') },
    image: imageUrl(DEFAULT_IMAGE),
    description: PAGES['/'].description,
    email: CONTACT.email,
    telephone: `+1-${CONTACT.phone}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Beverly Hills', addressRegion: 'CA', addressCountry: 'US' },
    areaServed: ['Beverly Hills, CA', 'Bel-Air, CA', 'Los Angeles, CA', 'California', 'United States'],
  }
  if (s.noindex) return { '@context': 'https://schema.org', '@graph': [org] }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { '@id': org['@id'] },
    inLanguage: 'en-US',
  }
  const crumbs = s.crumbs || (s.path === '/' ? [] : [[s.crumb, s.path]])
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [['Home', '/'], ...crumbs].map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
  }
  const page = {
    '@type': s.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: s.title,
    description: s.description,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': org['@id'] },
    primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl(s.image) },
    breadcrumb: { '@id': breadcrumb['@id'] },
    inLanguage: 'en-US',
  }
  const graph = [org, website, page, breadcrumb]
  const d = s.development
  if (d) {
    graph.push({
      '@type': d.type === 'Condominium Residences' ? 'ApartmentComplex' : 'Residence',
      '@id': `${url}#residence`,
      name: d.name,
      description: d.vision,
      url,
      image: [d.hero, ...(d.gallery || [])].filter((v, i, a) => a.indexOf(v) === i).map(imageUrl),
      address: { '@type': 'PostalAddress', addressLocality: d.area, addressRegion: 'CA', addressCountry: 'US' },
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

/* Every indexable URL, used for pre-rendering and the XML sitemap. */
export const ROUTES = [...Object.keys(PAGES), ...DEVELOPMENTS.map((d) => `/developments/${d.slug}`)]
