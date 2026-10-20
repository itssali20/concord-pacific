import WIDTHS from './image-widths.json'

export const IMG = (n) => `/images/${n}.webp`

const STEPS = [640, 1280, 1920]
/** <img> props with a srcset of the resized copies made by scripts/images.js, so small screens get small files. */
export const imgSrc = (n, sizes = '100vw') => {
  const w = WIDTHS[n]
  const steps = w ? STEPS.filter((s) => s < w) : []
  if (!steps.length) return { src: IMG(n) }
  return { srcSet: [...steps.map((s) => `/img-sizes/${s}/${n}.webp ${s}w`), `${IMG(n)} ${w}w`].join(', '), sizes, src: IMG(n) }
}

export const CONTACT = {
  email: import.meta.env.VITE_CONTACT_EMAIL || '1000pacific@gmail.com',
  phone: import.meta.env.VITE_CONTACT_PHONE || '800-201-0145',
  city: 'Beverly Hills, California',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/developments', label: 'Developments' },
  { to: '/signature-residences', label: 'Signature Residences', short: 'Residences' },
  { to: '/design-and-materials', label: 'Design & Materials', short: 'Materials' },
  { to: '/our-vision', label: 'Our Vision' },
  { to: '/international-team', label: 'International Team', short: 'Team' },
  { to: '/company', label: 'Company' },
  { to: '/building-materials', label: 'Building Materials & Distribution', short: 'Building Materials' },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/contact', label: 'Contact' },
]

export const HERO_SLIDES = [
  { img: 'estate-pool-sunset', label: 'Beverly Hills Estate', note: 'Contemporary estate at sunset' },
  { img: 'estate-summit', label: 'Bel-Air Hillside', note: 'Overlooking Los Angeles' },
  { img: 'condo-sunset', label: 'Condominium Architecture', note: 'Modern residential development' },
  { img: 'interior-great-room', label: 'Exceptional Interiors', note: 'Proportion, material and light' },
]

export const LOCATIONS = [
  { name: 'Beverly Hills', line: 'Timeless addresses. Exceptional residences.', img: 'estate-stairs-tall', coord: '34.0736° N, 118.4004° W' },
  { name: 'Bel-Air', line: 'Privacy. Architecture. Extraordinary living.', img: 'estate-heritage', coord: '34.0881° N, 118.4468° W' },
  { name: 'Greater Los Angeles', line: 'A new generation of luxury residential development.', img: 'loc-century-city', coord: '34.0522° N, 118.2437° W' },
]

export const PILLARS = [
  { t: 'Architecture', d: 'Distinctive architecture conceived specifically for its location, environment and residents.', img: 'estate-grand' },
  { t: 'Engineering', d: 'Sophisticated structural and engineering solutions supporting ambitious architectural ideas.', img: 'construction-plans' },
  { t: 'Interior Design', d: 'Interiors where proportion, materials, light and craftsmanship create an exceptional living environment.', img: 'interior-living' },
  { t: 'Craftsmanship', d: 'Meticulous attention from structure through final hardware.', img: 'materials-stone' },
  { t: 'Technology', d: 'Advanced residential technology, security, lighting, climate and building systems integrated into the architecture.', img: 'interior-great-room' },
  { t: 'Landscape', d: 'Architecture and landscape conceived as a unified indoor-outdoor experience.', img: 'estate-fire-terrace' },
]

export const DISCIPLINES = [
  { t: 'Architecture', d: 'International and local architectural expertise.' },
  { t: 'Structural Engineering', d: 'Sophisticated engineering supporting innovative residential architecture.' },
  { t: 'Civil Engineering', d: 'Site planning, infrastructure and development execution.' },
  { t: 'Interior Design', d: 'Sophisticated residential interiors conceived as an extension of the architecture.' },
  { t: 'Landscape Architecture', d: 'Landscape, architecture and outdoor living integrated into one environment.' },
  { t: 'Construction', d: 'Experienced builders, construction professionals and craftspeople translating drawings into reality.' },
  { t: 'Specialty Consultants', d: 'Lighting, acoustics, technology, security, sustainability and other specialized disciplines.' },
]

export const VISION = [
  { t: 'Exceptional Locations', d: 'The quality of a development begins with the quality of its location.', img: 'loc-beverly-hills-entry' },
  { t: 'Architectural Integrity', d: 'Architecture should have purpose, proportion and identity.', img: 'estate-heritage' },
  { t: 'International Perspective', d: 'Great ideas have no geographic boundaries.', img: 'team-ceo-model' },
  { t: 'Uncompromising Quality', d: 'Materials and craftsmanship determine how a residence feels today and how it endures tomorrow.', img: 'materials-stone' },
  { t: 'Disciplined Execution', d: 'Vision has value only when it can be executed successfully.', img: 'construction-team' },
  { t: 'Enduring Value', d: 'Residences intended to remain desirable for generations.', img: 'estate-summit' },
]

export const OPPORTUNITIES = [
  { k: 'Property Owners', d: 'Considering selling or developing an exceptional property?', cta: 'Contact our development team', topic: 'Development Opportunities', img: 'estate-viewpoint' },
  { k: 'Brokers', d: 'We welcome qualified on-market and off-market opportunities.', cta: 'Submit a property', topic: 'Broker Submissions', img: 'loc-bel-air' },
  { k: 'Investors', d: 'Select projects may offer opportunities for strategic investment participation.', cta: 'Investment inquiries', topic: 'Investment & Joint Ventures', img: 'condo-facade' },
  { k: 'Joint Ventures', d: 'We consider strategic partnerships with property owners, investors and development partners.', cta: 'Discuss a partnership', topic: 'Investment & Joint Ventures', img: 'estate-reserve' },
]

export const OPP_TYPES = [
  'Development Sites', 'Luxury Residential Properties', 'Condominium Development Opportunities', 'Redevelopment Opportunities',
  'Landowner Partnerships', 'Joint Ventures', 'Investment Opportunities', 'Broker Submissions',
]

export const INQUIRY_TYPES = ['General Inquiries', 'Development Opportunities', 'Broker Submissions', 'Investment & Joint Ventures', 'Sales Inquiries', 'Building Materials & Distribution', 'Manufacturing Partnership']

export const GALLERY = {
  Kitchens: ['interior-kitchen', 'interior-wine-dining', 'estate-reserve'],
  Bathrooms: ['condo-bath', 'interior-primary-suite', 'amenity-lobby'],
  'Windows & Glass': ['interior-penthouse', 'condo-living', 'interior-great-room', 'interior-bedroom-view'],
  'Materials & Stone': ['materials-stone', 'amenity-lobby', 'interior-living', 'interior-kitchen'],
  'Primary Suites': ['interior-primary-suite', 'interior-bedroom-view', 'condo-bedroom'],
  'Closets & Millwork': ['interior-closet', 'interior-wine-dining', 'interior-great-room'],
  'Living Spaces': ['interior-great-room', 'interior-penthouse', 'interior-living', 'condo-living'],
  'Theater & Wine': ['interior-theater', 'interior-wine-dining', 'interior-great-room'],
  'Outdoor Living': ['indoor-outdoor-terrace', 'estate-fire-terrace', 'amenity-rooftop-pool', 'condo-rooftop-pool'],
  Landscapes: ['landscape-garden', 'estate-stairs-tall', 'estate-oakridge', 'estate-viewpoint'],
  Architecture: ['arch-timeless', 'estate-heritage', 'plans-section', 'plans-floors'],
  Construction: ['construction-team', 'construction-plans', 'construction-site', 'transformation'],
}

/* Design & Materials — the craft categories */
export const MATERIALS = [
  {
    id: 'kitchens', t: 'Kitchens', line: 'The heart of the residence, engineered like fine furniture.', img: 'interior-kitchen', alt: 'interior-wine-dining',
    d: 'Chef-grade kitchens with waterfall natural-stone islands, custom cabinetry, integrated professional appliances, scullery and prep kitchens, and display millwork lit from within.',
    specs: ['Waterfall stone islands', 'Custom European cabinetry', 'Professional integrated appliances', 'Butler’s pantry & scullery', 'Illuminated display cabinetry'],
  },
  {
    id: 'bathrooms', t: 'Bathrooms', line: 'Spa-level primary baths in book-matched stone.', img: 'condo-bath', alt: 'amenity-lobby', ratio: '5 / 3',
    d: 'Primary bathrooms conceived as private spas — freestanding soaking tubs, walk-in rain showers, heated stone floors, double vanities and floor-to-ceiling views where privacy allows.',
    specs: ['Freestanding soaking tubs', 'Frameless glass rain showers', 'Radiant heated floors', 'Book-matched marble slabs', 'Designer fittings & hardware'],
  },
  {
    id: 'windows', t: 'Windows & Glazing', line: 'Views transformed into architecture.', img: 'interior-penthouse', alt: 'indoor-outdoor-terrace',
    d: 'Floor-to-ceiling glazing, slim-profile steel and aluminum window systems and fully retractable glass walls dissolve the line between interior and the Southern California landscape.',
    specs: ['Floor-to-ceiling glass walls', 'Minimal-frame sliding systems', 'Pocketing corner openings', 'High-performance low-E glazing', 'Motorized shading'],
  },
  {
    id: 'materials', t: 'Natural Stone & Materials', line: 'Materials selected without compromise.', img: 'materials-stone', alt: 'amenity-lobby',
    d: 'Marble, travertine, quartzite, limestone, rare woods and bronze are selected slab by slab from quarries and ateliers around the world — chosen for how they feel today and how they age tomorrow.',
    specs: ['Imported marble & quartzite', 'Wide-plank European oak', 'Bronze & brushed-metal accents', 'Hand-selected slabs', 'Plaster & natural finishes'],
  },
  {
    id: 'flooring', t: 'Hardwood Flooring', line: 'Wide-plank European oak, underfoot throughout.', img: 'materials-floor-hardwood', alt: 'materials-floor-lifestyle',
    gallery: ['materials-floor-species', 'materials-floor-closeup'],
    d: 'Wide-plank European oak is hand-selected and finished in a range of tones — from bleached white oak to rich, dark walnut stains — laid throughout living and private spaces for warmth underfoot.',
    specs: ['Wide-plank European oak', 'Hand-selected boards', 'Multiple stain tones', 'Site-finished for a seamless surface', 'Sound-dampening underlayment'],
  },
  {
    id: 'millwork', t: 'Millwork & Closets', line: 'Craftsmanship from structure through final hardware.', img: 'interior-closet', alt: 'interior-great-room',
    d: 'Custom millwork, dressing rooms and boutique-style closets with integrated lighting, glass-front display cabinetry, leather and wood finishes and bespoke hardware.',
    specs: ['Boutique dressing rooms', 'Glass-front display cases', 'Integrated LED lighting', 'Bespoke hardware', 'Library & paneled walls'],
  },
  {
    id: 'lighting', t: 'Lighting & Technology', line: 'Light, climate and security — invisibly integrated.', img: 'interior-living', alt: 'amenity-lobby',
    d: 'Architectural and decorative lighting design, whole-home automation, climate, audio-visual and security systems integrated into the architecture rather than added to it.',
    specs: ['Architectural lighting design', 'Whole-home automation', 'Integrated audio-visual', 'Security & access control', 'Energy-efficient climate systems'],
  },
  {
    id: 'entertaining', t: 'Wine, Theater & Wellness', line: 'Spaces created for meaningful moments.', img: 'interior-theater', alt: 'interior-wine-dining',
    d: 'Temperature-controlled wine galleries, private cinemas, spa and fitness levels and entertainment spaces designed for both intimate evenings and grand gatherings.',
    specs: ['Wine galleries & tasting rooms', 'Private home theaters', 'Spa, sauna & fitness', 'Entertainment levels', 'Guest suites'],
  },
  {
    id: 'outdoor', t: 'Pools, Terraces & Landscape', line: 'Designed around California.', img: 'indoor-outdoor-terrace', alt: 'landscape-garden',
    d: 'Infinity-edge pools, fire lounges, rooftop terraces, specimen olive trees and landscape lighting — architecture and landscape conceived as a single indoor-outdoor experience.',
    specs: ['Infinity-edge pools & spas', 'Fire lounges & outdoor kitchens', 'Rooftop terraces', 'Mature specimen trees', 'Landscape lighting'],
  },
]

/* Leadership & team */
export const CEO = {
  name: 'Roman Alexander',
  role: 'Chief Executive Officer',
  bio: [
    'Roman Alexander provides the entrepreneurial vision and development leadership behind Master Craft International, a division of Concord Pacific Corp.',
    'Working closely with the company’s architects, designers, engineers and development professionals, he is involved in shaping the overall vision for each property — from identifying its potential to defining the architecture, design direction and ultimate residential experience.',
  ],
}

export const PROCESS = [
  { k: 'Plan', d: 'Site selection, feasibility, market potential and a singular vision for what the property can become.', img: 'construction-team' },
  { k: 'Design', d: 'Architecture, engineering, interiors and landscape developed together from the first drawings.', img: 'team-disciplines-overview' },
  { k: 'Build', d: 'Experienced builders, engineers and master craftsmen translating drawings into reality on site.', img: 'construction-plans' },
  { k: 'Deliver', d: 'Final detailing, finishes and systems — residences of lasting architectural and real estate value.', img: 'estate-grand' },
]

/* Building Materials & Architectural Products Distribution — product categories */
export const BM_PRODUCTS = [
  {
    id: 'roofing', t: 'Roofing Materials', line: 'Roofing products for residential and commercial applications.',
    img: 'roof-mediterranean-aerial', gallery: ['roof-modern-farmhouse', 'roof-slate-detail', 'materials-roof-swatches', 'materials-roof-mediterranean', 'materials-roof-exterior'],
    d: 'Modular steel roofing systems in tile, slate, shake and modern flat profiles, in factory-painted and stone-coated finishes. Lightweight, corrosion-protected and engineered for extreme weather, they deliver the look of clay, slate or wood with the strength and longevity of steel.',
    specs: ['Class 4 impact & Class A fire ratings', 'Engineered for hurricane-force winds', 'Painted & stone-coated steel finishes', 'Lightweight, solar-ready modular panels', 'Long-term transferable warranties'],
  },
  {
    id: 'interior-doors', t: 'Interior Doors', line: 'Interior door products for a variety of architectural styles.',
    img: 'interior-doors-lineup', ratio: '1282 / 713', gallery: ['door-col-glass', 'door-col-signature', 'door-col-inlay', 'door-col-milled', 'door-col-concealed'],
    d: 'European-manufactured interior doors in five collections — glass-insert, signature, aluminum-inlay, 3D-milled and concealed-frame — with German-engineered decorative surfaces, enamel, wood-look and concrete-effect finishes, and satin, black or mirror glass.',
    specs: ['Five collections, 200+ designs', 'German-engineered decorative surfaces', 'Enamel, oak, ash & concrete-effect finishes', 'Satin, black & mirror glass options', 'Concealed-frame flush doors'],
  },
  {
    id: 'exterior-doors', t: 'Exterior Doors', line: 'Entry and exterior door systems.',
    img: 'materials-door-collage', gallery: ['materials-door-woodgrain', 'materials-door-dark', 'materials-door-double-marble', 'materials-door-lit', 'materials-door-glassslat', 'materials-door-panel'],
    d: 'Entry and exterior door systems in contemporary and traditional designs — pivot and hinged entry doors, single and double doors, wood-grain and metal finishes and glass-insert models — selected for craftsmanship, security and durable, weather-resistant finishes.',
    specs: ['Pivot & hinged entry doors', 'Single & double door systems', 'Wood-grain, metal & painted finishes', 'Glass-insert designs', 'Residential & development-scale supply'],
  },
  {
    id: 'sliding-glass', t: 'Sliding Glass Doors', line: 'Architectural sliding glass door systems.',
    img: 'materials-glass-sunset', gallery: ['materials-glass-pool'],
    d: 'Architectural sliding glass door systems with slim frames and large-format glass panels that open living spaces to natural light, views and outdoor terraces.',
    specs: ['Multi-panel sliding systems', 'Slim-frame profiles', 'Large-format glass panels', 'Pocketing & corner configurations', 'Residential & commercial applications'],
  },
  {
    id: 'folding-glass', t: 'Folding Glass Doors', line: 'Folding and bi-fold systems for expansive architectural openings.',
    img: 'materials-glass-oceanview', gallery: ['materials-glass-sliding-collage'],
    d: 'Folding and bi-fold glass door systems that stack neatly to one side, opening entire walls to terraces, pools and gardens for true indoor-outdoor living.',
    specs: ['Bi-fold & multi-panel folding systems', 'Fully opening wall configurations', 'Slim aluminum frames', 'Inswing & outswing configurations', 'Indoor-outdoor living spaces'],
  },
  {
    id: 'additional', t: 'Additional Building Materials', line: 'Other construction products and materials.',
    img: 'gutter-soffit-eave', gallery: ['gutter-system', 'soffit-woodgrain', 'fence-steel', 'materials-kitchen-walnut', 'materials-floor-hardwood'],
    d: 'Complementary construction products including steel gutter systems, PVC soffits and steel fencing — plus categories we are actively sourcing, such as kitchen cabinetry, garage doors, windows and hardwood flooring.',
    specs: ['Steel gutter systems', 'PVC soffit panels', 'Steel fencing systems', 'Cabinetry, garage doors & windows', 'Hardwood & engineered flooring'],
  },
]

export const BM_ROOF_SPECS = ['Class 4 impact rating', 'Class A fire rating', 'Hurricane-rated up to 180–200 mph', 'Miami-Dade / HVHZ options', 'Warranties up to lifetime', 'Solar-ready']

export const BM_ROOF_PROFILES = [
  { t: 'Barrel Tile Profile', d: 'A curved barrel-tile look for Mediterranean and Spanish-style architecture.', img: 'roof-profile-barrel', variants: ['roof-profile-barrel-sand'] },
  { t: 'Classic Tile Profile', d: 'A traditional tile-inspired profile that suits most neighborhoods and HOA requirements.', img: 'roof-profile-classic', variants: ['roof-profile-classic-silver', 'roof-profile-tile-green'] },
  { t: 'Modern Flat Profile', d: 'Clean flat-lock lines with raised ridges for contemporary homes.', img: 'roof-profile-modern', variants: ['roof-profile-modern-brown'] },
  { t: 'Slate Profile', d: 'A flat, high-definition slate look with sharp architectural lines.', img: 'roof-profile-slate', variants: ['roof-profile-slate-brown'] },
  { t: 'Wood Shake Profile', d: 'The character of cedar shake in painted steel, for Craftsman, rustic and cabin-style homes.', img: 'roof-profile-wood', variants: [] },
  { t: 'Stone-Coated Steel', d: 'Natural stone granules bonded to steel for a textured matte finish, in barrel and slate profiles.', img: 'roof-profile-stone-barrel', variants: ['roof-profile-stone-slate'] },
]

export const BM_ROOF_ACCESSORIES = [
  { t: 'Steel Gutter Systems', d: 'Seamless 26-gauge steel gutters with a complete system of corners, outlets, downspouts and hangers, in brown, white, black, graphite and red.', img: 'gutter-system', variants: ['gutter-black'] },
  { t: 'PVC Soffit Panels', d: 'Two-layer PVC soffits in vented and solid panels, with wood-grain and solid colors that never need painting.', img: 'soffit-woodgrain', variants: ['soffit-home'] },
  { t: 'Steel Fencing', d: 'Powder-coated tubular steel fence systems in anthracite and walnut, packaged ready to install.', img: 'fence-steel', variants: ['fence-walnut'] },
]

export const BM_ROOF_PROJECTS = [
  'roof-modern-farmhouse', 'roof-mediterranean-aerial', 'roof-ranch-home', 'roof-gray-aerial', 'roof-night-home',
  'roof-villa', 'roof-hip-aerial', 'roof-brown-tile', 'roof-residential-aerial', 'roof-slate-detail',
]

const DOOR_FINISHES = ['White enamel (RAL 9003)', 'Dark gray (RAL 7016)', 'Light gray (RAL 7044)', 'Gray oak', 'Cream oak', 'White ash']
export const BM_DOOR_COLLECTIONS = [
  {
    t: 'Glass-Insert Collection', meta: '19 designs', img: 'door-col-glass',
    d: 'Modern and classic doors with a German-made decorative coating and satin or black glass inserts.',
    doors: ['door-glass-1', 'door-glass-2', 'door-glass-3', 'door-glass-4'], finishes: ['Alpine white', 'Matte gray', 'Matte cream', 'Matte black'],
  },
  {
    t: 'Signature Collection', meta: '100+ designs', img: 'door-col-signature',
    d: 'Our broadest range of modern and classic designs, with wood-look and enamel surfaces and satin or black glass.',
    doors: ['door-signature-1', 'door-signature-2', 'door-signature-3', 'door-signature-4'], finishes: DOOR_FINISHES,
  },
  {
    t: 'Aluminum-Inlay Collection', meta: '50+ designs', img: 'door-col-inlay',
    d: 'Minimalist doors with aluminum inlays in gray, black or gold, white or black glass, mirror inserts and aluminum or ABS edges.',
    doors: ['door-inlay-1', 'door-inlay-2', 'door-inlay-3', 'door-inlay-4'], finishes: [...DOOR_FINISHES, 'Gray concrete', 'Matte gray', 'Matte cream'],
  },
  {
    t: '3D-Milled Collection', meta: '35 designs', img: 'door-col-milled',
    d: 'Modern-minimalist and neoclassical doors with 3D-milled relief surfaces and gray or black aluminum edges.',
    doors: ['door-milled-1', 'door-milled-2', 'door-milled-3', 'door-milled-4'], finishes: [...DOOR_FINISHES, 'Gray concrete', 'Matte gray', 'Matte cream'],
  },
  {
    t: 'Concealed-Frame Doors', meta: 'Flush installation', img: 'door-col-concealed',
    d: 'Doors that disappear into the wall: an anodized aluminum frame and a primed surface ready to paint to match any interior.',
    doors: ['door-concealed-1', 'door-concealed-2'], finishes: ['Paint-ready primed surface', 'Gray or black aluminum edge'],
  },
]

export const BM_ADDITIONAL = [
  { t: 'Kitchen & Custom Cabinetry', d: 'Kitchen cabinets, vanities and storage systems in custom finishes.', imgs: ['materials-kitchen-walnut', 'materials-kitchen-cream', 'materials-kitchen-island', 'materials-kitchen-woodfloor', 'materials-kitchen-marble', 'materials-kitchen-bar'] },
  { t: 'Garage Doors', d: 'Contemporary garage doors in glass, aluminum and wood-look finishes.', imgs: ['materials-garage-collage', 'materials-garage-dark', 'materials-garage-glass'] },
  { t: 'Hardwood Flooring', d: 'Wide-plank and engineered hardwood in natural and contemporary finishes.', imgs: ['materials-floor-hardwood', 'materials-floor-lifestyle', 'materials-floor-species', 'materials-floor-closeup'] },
]

export const BM_PLATFORM = [
  { k: 'Development', d: 'Residential and multifamily real estate development, from opportunity identification and planning through execution.', img: 'estate-grand' },
  { k: 'Construction', d: 'Practical construction experience and an understanding of how buildings come together from concept through completion.', img: 'construction-team' },
  { k: 'Global Sourcing', d: 'Continuous worldwide search for exceptional manufacturers, innovative technologies, and beautiful architectural products.', img: 'construction-plans' },
  { k: 'Distribution', d: 'Connecting quality manufacturers with projects, builders, developers, architects, designers, and customers throughout California and the United States.', img: 'transformation' },
]

export const BM_PRIORITIES = [
  'Exceptional Quality', 'Distinctive Design', 'Advanced Technology', 'Strong Engineering',
  'Durability & Reliability', 'Energy Efficiency', 'Competitive Value', 'Reliable Manufacturing Capacity',
]

export const BM_SERVES = [
  'Residential Developers', 'Multifamily Developers', 'Homebuilders', 'General Contractors', 'Custom Home Builders',
  'Architects', 'Interior Designers', 'Construction Companies', 'Remodeling Companies', 'Property Owners & Investors', 'Building Material Dealers & Distributors',
]

export const BM_AUDIENCES = [
  { k: 'Developers, Builders & Contractors', d: 'We can evaluate design specifications, product selection, quantities, construction schedules, lead times and delivery requirements for your project.', cta: 'Tell us about your project', topic: 'Building Materials & Distribution', img: 'materials-door-collage' },
  { k: 'Architects & Designers', d: 'Explore our roofing, interior and exterior door, and sliding and folding glass door products for residential and commercial architecture.', cta: 'Explore our products', topic: 'Building Materials & Distribution', img: 'materials-glass-sliding-collage' },
  { k: 'International Manufacturers', d: 'If your company manufactures an exceptional construction or architectural product and is seeking opportunities in California or the broader U.S. market, we’d like to hear from you.', cta: 'Introduce your company', topic: 'Manufacturing Partnership', img: 'materials-roof-mediterranean' },
  { k: 'Distribution Partners', d: 'We can evaluate opportunities involving product representation, distribution, project applications, developer relationships and market development.', cta: 'Discuss U.S. distribution', topic: 'Manufacturing Partnership', img: 'materials-garage-collage' },
]
