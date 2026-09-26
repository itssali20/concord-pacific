export const IMG = (n) => `/images/${n}.webp`

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
    id: 'lighting', t: 'Lighting & Technology', line: 'Light, climate and security — invisibly integrated.', img: 'interior-great-room', alt: 'amenity-lobby',
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
    'Roman Alexander provides the entrepreneurial vision and development leadership behind Concord Pacific, Corp.',
    'Working closely with the company’s architects, designers, engineers and development professionals, he is involved in shaping the overall vision for each property — from identifying its potential to defining the architecture, design direction and ultimate residential experience.',
  ],
}

export const PROCESS = [
  { k: 'Plan', d: 'Site selection, feasibility, market potential and a singular vision for what the property can become.', img: 'construction-team' },
  { k: 'Design', d: 'Architecture, engineering, interiors and landscape developed together from the first drawings.', img: 'team-office' },
  { k: 'Build', d: 'Experienced builders, engineers and master craftsmen translating drawings into reality on site.', img: 'construction-plans' },
  { k: 'Deliver', d: 'Final detailing, finishes and systems — residences of lasting architectural and real estate value.', img: 'estate-grand' },
]

/* Building Materials & Distribution — product categories */
export const BM_PRODUCTS = [
  {
    id: 'kitchens', t: 'Kitchen Cabinets & Custom Cabinetry', line: 'Engineered like fine furniture.',
    img: 'materials-kitchen-walnut', gallery: ['materials-kitchen-cream', 'materials-kitchen-island', 'materials-kitchen-woodfloor', 'materials-kitchen-marble', 'materials-kitchen-bar'],
    d: 'We source kitchen cabinets, bathroom vanities, storage systems, and custom cabinetry designed for today’s residential market. We seek manufacturers capable of combining beautiful design, precise manufacturing, quality materials, durable finishes, efficient installation, and competitive project pricing.',
    specs: ['Kitchen cabinets & bath vanities', 'Custom storage systems', 'Precise manufacturing', 'Durable finishes', 'Competitive project pricing'],
  },
  {
    id: 'doors', t: 'Doors', line: 'Craftsmanship at the threshold.',
    img: 'materials-door-collage', gallery: ['materials-door-woodgrain', 'materials-door-dark', 'materials-door-double-marble', 'materials-door-lit', 'materials-door-glassslat', 'materials-door-panel'],
    d: 'We seek interior and exterior door manufacturers offering contemporary and traditional designs, exceptional craftsmanship, reliable hardware, durable finishes, and solutions suitable for both individual residences and large-scale development projects.',
    specs: ['Interior & exterior designs', 'Contemporary & traditional styles', 'Reliable hardware', 'Durable finishes', 'Large-scale project capacity'],
  },
  {
    id: 'garage-doors', t: 'Garage Doors & Garage Door Systems', line: 'Architecture, not just function.',
    img: 'materials-garage-collage', gallery: ['materials-garage-dark', 'materials-garage-glass'],
    d: 'We are interested in exceptional garage door manufacturers offering contemporary architectural designs, glass and aluminum systems, wood and wood-look finishes, advanced operating systems, insulation, security, and innovative engineering. Our goal is to provide garage door solutions that contribute to the architecture of the home rather than simply serve a functional purpose.',
    specs: ['Glass & aluminum systems', 'Wood & wood-look finishes', 'Advanced operating systems', 'Insulation & security', 'Innovative engineering'],
  },
  {
    id: 'windows', t: 'Windows & Window Systems', line: 'Views transformed into architecture.',
    img: 'materials-glass-sunset', gallery: ['materials-glass-oceanview'],
    d: 'We seek high-quality residential window systems that combine architectural design, energy efficiency, durability, engineering, and long-term performance.',
    specs: ['Architectural design', 'Energy-efficient glazing', 'Durability & engineering', 'Long-term performance'],
  },
  {
    id: 'sliding-glass', t: 'Sliding & Folding Glass Door Systems', line: 'Connecting indoor and outdoor living.',
    img: 'materials-glass-sliding-collage', gallery: ['materials-glass-pool'],
    d: 'Modern residential architecture increasingly depends on large openings, natural light, expansive views, and a seamless connection between interior and exterior spaces. Products of interest include sliding glass doors, folding glass doors, multi-panel sliding systems, bi-fold door systems, large-format architectural glass doors, and indoor-outdoor opening systems.',
    specs: ['Multi-panel sliding systems', 'Bi-fold door systems', 'Large-format glass doors', 'Minimal architectural profiles', 'Indoor-outdoor opening systems'],
  },
  {
    id: 'flooring', t: 'Hardwood Flooring & Premium Wood Surfaces', line: 'Natural materials. Exceptional interiors.',
    img: 'materials-floor-hardwood', gallery: ['materials-floor-lifestyle', 'materials-floor-species', 'materials-floor-closeup'],
    d: 'Concord Pacific Corp. seeks relationships with outstanding manufacturers of hardwood flooring, engineered hardwood, and premium wood flooring systems from around the world. We are particularly interested in exceptional wood quality, distinctive species and grains, wide-plank flooring, European and contemporary finishes, natural textures, herringbone and specialty patterns, advanced engineered construction, durability, dimensional stability, and responsible manufacturing.',
    specs: ['Wide-plank & engineered hardwood', 'Distinctive species & grains', 'European & contemporary finishes', 'Herringbone & specialty patterns', 'Dimensional stability'],
  },
  {
    id: 'roofing', t: 'Roofing Materials & Systems', line: 'Performance above everything.',
    img: 'materials-roof-exterior', gallery: ['materials-roof-swatches', 'materials-roof-mediterranean'],
    d: 'We seek manufacturers of roofing products that combine durability, weather performance, engineering, energy efficiency, attractive design, and competitive value.',
    specs: ['Durability & weather performance', 'Advanced engineering', 'Energy efficiency', 'Attractive design', 'Competitive value'],
  },
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
  { k: 'Architects & Designers', d: 'Explore a growing portfolio of kitchen, door, window, flooring and roofing products selected for today’s residential architecture.', cta: 'Explore our products', topic: 'Building Materials & Distribution', img: 'materials-glass-sliding-collage' },
  { k: 'International Manufacturers', d: 'If your company manufactures an exceptional construction or architectural product and is seeking opportunities in California or the broader U.S. market, we’d like to hear from you.', cta: 'Introduce your company', topic: 'Manufacturing Partnership', img: 'materials-roof-mediterranean' },
  { k: 'Distribution Partners', d: 'We can evaluate opportunities involving product representation, distribution, project applications, developer relationships and market development.', cta: 'Discuss U.S. distribution', topic: 'Manufacturing Partnership', img: 'materials-garage-collage' },
]
