import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, CtaBand, Marquee } from '../components/UI'
import InquiryForm from '../components/InquiryForm'
import {
  BM_PRODUCTS, BM_ROOF_SPECS, BM_ROOF_PROFILES, BM_ROOF_ACCESSORIES, BM_ROOF_PROJECTS, BM_DOOR_COLLECTIONS, BM_ADDITIONAL,
  BM_PLATFORM, BM_PRIORITIES, BM_SERVES, BM_AUDIENCES, imgSrc,
} from '../data/site'
import useSEO from '../lib/useSEO'
import { altFor } from '../data/seo'

const MORE = {
  roofing: ['roofing-systems', 'View roofing profiles & accessories'],
  'interior-doors': ['door-collections', 'View the door collections'],
  additional: ['additional-materials', 'View additional materials'],
}

const scrollToId = (id, offset = -90) => {
  const el = document.getElementById(id)
  if (!el) return
  window.__lenis ? window.__lenis.scrollTo(el, { offset }) : el.scrollIntoView({ behavior: 'smooth' })
}

function ProductCard({ t, d, img, variants = [], render, tag }) {
  return (
    <article className={`pc ${render ? 'pc--render' : ''}`}>
      <div className="pc__img"><img {...imgSrc(img, '(max-width: 900px) 100vw, 33vw')} alt={altFor(img)} loading="lazy" /></div>
      <div className="pc__body">
        {tag && <span className="pc__tag">{tag}</span>}
        <h3>{t}</h3>
        <p>{d}</p>
        {variants.length > 0 && (
          <div className="pc__var">{variants.map((v) => <img key={v} {...imgSrc(v, '120px')} alt={altFor(v)} loading="lazy" />)}</div>
        )}
      </div>
    </article>
  )
}

export default function BuildingMaterials() {
  useSEO('/building-materials')
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const formRef = useRef(null)
  const [topic, setTopic] = useState('Building Materials & Distribution')

  useReveal(ref, (q, rm) => {
    q('.mt__sec').forEach((sec, i) => {
      ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) })
    })
    if (rm) return
    q('.mt__specs li').forEach((li) => {
      gsap.from(li, { x: -30, autoAlpha: 0, duration: 0.9, scrollTrigger: { trigger: li, start: 'top 92%' } })
    })
  })

  const pick = (t) => {
    setTopic(t)
    const el = formRef.current
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={ref}>
      <PageHero img="interior-living" eyebrow="Construction Material Distribution" title={<>Building homes. <em>Supplying the materials.</em></>} sub="Exceptional quality products from the USA and internationally — roofing, doors, sliding and folding glass doors and more." />

      <section className="wrap tm-intro">
        <Eyebrow n="01">Building Materials &amp; Architectural Products Distribution</Eyebrow>
        <p className="intro__statement" data-words>Concord Pacific Corp. distributes a diverse selection of quality building materials and architectural products for residential and commercial construction, remodeling, and development projects.</p>
        <div className="tm-intro__cols">
          <p className="lead" data-fade>Our product categories include roofing materials, interior and exterior doors, architectural sliding and folding glass doors, and other construction materials.</p>
          <p data-fade="0.1">Through domestic and international sourcing, Concord Pacific Corp. offers building products designed to meet the needs of contractors, builders, developers, architects, and construction professionals.</p>
        </div>
      </section>

      <Marquee items={BM_PRODUCTS.map((m) => m.t)} />

      <section className="wrap mt-intro">
        <Eyebrow n="02">Our Product Categories</Eyebrow>
        <p className="intro__statement" data-words>Exceptional quality products from the USA and internationally.</p>
        <div className="mt-index mt-index--3" data-stagger>
          {BM_PRODUCTS.map((m) => (
            <button key={m.id} className="mt-index__item" onClick={() => scrollToId(m.id)} data-cursor="View">
              <span className="mt-index__img"><img {...imgSrc(m.img, '(max-width: 900px) 50vw, 25vw')} alt="" loading="lazy" /></span>
              <span className="mt-index__n">{String(BM_PRODUCTS.indexOf(m) + 1).padStart(2, '0')}</span>
              <span>
                <span className="mt-index__t">{m.t}</span>
                <span className="mt-index__d">{m.line}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt wrap">
        <nav className="mt__nav" aria-label="Product categories">
          {BM_PRODUCTS.map((m, i) => (
            <button key={m.id} className={active === i ? 'is-on' : ''} onClick={() => scrollToId(m.id)} data-hover>
              <span>{String(i + 1).padStart(2, '0')}</span>{m.t}
            </button>
          ))}
        </nav>
        <div className="mt__body">
          {BM_PRODUCTS.map((m, i) => (
            <section className={`mt__sec ${i % 2 ? 'is-rev' : ''}`} id={m.id} key={m.id}>
              <div className="mt__media">
                <div style={m.ratio ? { aspectRatio: m.ratio } : undefined} className="mt__mainwrap"><Media img={m.img} parallax={m.ratio ? undefined : '8'} reveal={i % 2 ? 'right' : 'left'} className="mt__main" /></div>
              </div>
              <div className="mt__txt">
                <span className="mt__n">{String(i + 1).padStart(2, '0')}</span>
                <p className="eyebrow">{m.line}</p>
                <h2 className="h1" data-split>{m.t}</h2>
                <p className="lead" data-fade>{m.d}</p>
                <ul className="mt__specs">
                  {m.specs.map((s) => <li key={s}><i />{s}</li>)}
                </ul>
                {m.gallery && (
                  <div className={`mt__gallery ${m.id === 'interior-doors' ? 'mt__gallery--contain' : ''}`}>
                    {m.gallery.map((im) => <img key={im} {...imgSrc(im, '(max-width: 900px) 50vw, 20vw')} alt={altFor(im)} loading="lazy" />)}
                  </div>
                )}
                {MORE[m.id] && <button className="link-arrow mt__more" onClick={() => scrollToId(MORE[m.id][0])} data-hover>{MORE[m.id][1]}</button>}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="wrap bm-feat" id="roofing-systems">
        <div className="sect-head">
          <Eyebrow n="03">Roofing Systems</Eyebrow>
          <h2 className="h1" data-split>Modular steel roofing. <em>Built for every climate.</em></h2>
          <p className="lead" data-fade>Lightweight steel roofing panels with factory-applied, corrosion-protected finishes, engineered to withstand hurricane-force winds, hail and fire while recreating the look of clay tile, slate or wood shake.</p>
        </div>
        <ul className="bm-badges" data-stagger>{BM_ROOF_SPECS.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="pc-grid" data-stagger>
          {BM_ROOF_PROFILES.map((p) => <ProductCard key={p.t} {...p} render />)}
        </div>
        <h3 className="bm-sub">Roofing accessories</h3>
        <div className="pc-grid" data-stagger>
          {BM_ROOF_ACCESSORIES.map((p) => <ProductCard key={p.t} {...p} />)}
        </div>
        <h3 className="bm-sub">Installed roofing projects</h3>
        <div className="bm-strip" data-stagger>
          {BM_ROOF_PROJECTS.map((im) => <img key={im} {...imgSrc(im, '(max-width: 900px) 50vw, 20vw')} alt={altFor(im)} loading="lazy" />)}
        </div>
        <p className="bm-note">Colors include black, charcoal, gray, dark brown, brown, brick, red, sand and green. Ratings, color availability and warranty terms vary by product line and are confirmed with each quotation.</p>
      </section>

      <section className="bm-doors" id="door-collections">
        <div className="wrap">
          <div className="sect-head">
            <Eyebrow n="04">Interior Door Collections</Eyebrow>
            <h2 className="h1" data-split>Five collections. <em>200+ designs.</em></h2>
            <p className="lead" data-fade>European-manufactured prefabricated interior doors with German-engineered decorative surfaces, from classic paneled designs to minimalist glass, aluminum-inlay and concealed-frame doors.</p>
          </div>
          {BM_DOOR_COLLECTIONS.map((c) => (
            <article className="dc" key={c.t} data-fade>
              <div className="dc__cover"><img src={imgSrc(c.img).src} alt={`${c.t} interior doors`} loading="lazy" /></div>
              <div>
                <span className="dc__meta">{c.meta}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <div className="dc__doors">{c.doors.map((dr) => <img key={dr} src={imgSrc(dr).src} alt={altFor(dr)} loading="lazy" />)}</div>
                <p className="dc__fin"><b>Finishes:</b> {c.finishes.join(' · ')}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap bm-feat" id="additional-materials">
        <div className="sect-head">
          <Eyebrow n="05">Additional Building Materials</Eyebrow>
          <h2 className="h1" data-split>A growing portfolio. <em>One trusted source.</em></h2>
          <p className="lead" data-fade>Beyond roofing, doors and glass systems, we are building relationships with manufacturers of cabinetry, garage doors and hardwood flooring for residential and commercial projects.</p>
        </div>
        <div className="pc-grid" data-stagger>
          {BM_ADDITIONAL.map((g) => <ProductCard key={g.t} t={g.t} d={g.d} img={g.imgs[0]} variants={g.imgs.slice(1)} tag="Now sourcing" />)}
        </div>
      </section>

      <section className="wrap bm-dist">
        <Media img="roof-gray-aerial" reveal="left" />
        <div>
          <Eyebrow n="06">Domestic &amp; International Distribution</Eyebrow>
          <p className="display" data-split>Quality products. Global sourcing. <em>Professional service.</em></p>
          <p className="lead" data-fade>Concord Pacific Corp. is committed to developing a diverse portfolio of building materials and architectural products sourced from the United States and international markets.</p>
          <p data-fade="0.1">We continuously search for exceptional manufacturers, innovative companies and distinctive products that bring greater quality, beauty, performance, technology and value to the American construction market.</p>
        </div>
      </section>

      <section className="wrap tm-intro">
        <Eyebrow n="07">From the Developer's Perspective</Eyebrow>
        <p className="intro__statement" data-words>We don't approach building materials solely as a distributor. We are developers and builders ourselves.</p>
        <div className="tm-intro__cols">
          <p className="lead" data-fade>We understand how products perform in real construction environments and what developers and contractors need to successfully complete a project. We evaluate products from the perspective of the people who actually specify, purchase, install and live with them.</p>
          <p data-fade="0.1">We consider design, craftsmanship, engineering, durability, installation, energy efficiency, availability, manufacturing capacity, logistics, long-term performance and overall project value. Our objective is straightforward: find exceptional products and connect them with exceptional projects.</p>
        </div>
      </section>

      <section className="wrap op-types">
        <Eyebrow n="08">What we look for</Eyebrow>
        <ul data-stagger>{BM_PRIORITIES.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <section className="wrap op">
        {BM_AUDIENCES.map((o, i) => (
          <article className="op__card" key={o.k} data-fade={i * 0.08}>
            <div className="op__img"><img {...imgSrc(o.img, '(max-width: 900px) 100vw, 50vw')} alt={altFor(o.img)} loading="lazy" /></div>
            <div className="op__body">
              <span className="op__n">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="h2">{o.k}</h2>
              <p>{o.d}</p>
              <button className="link-arrow" onClick={() => pick(o.topic)} data-hover>{o.cta}</button>
            </div>
          </article>
        ))}
      </section>

      <section className="op-form" ref={formRef}>
        <div className="wrap op-form__in">
          <div>
            <Eyebrow light>Request product information</Eyebrow>
            <h2 className="h1 light" data-split>Quality products. <em>Professional service.</em></h2>
            <p className="lead light" data-fade>Tell us about your project — product categories, quantities, specifications and timeline — and our team will respond with availability and pricing.</p>
          </div>
          <InquiryForm key={topic} defaultType={topic} dark />
        </div>
      </section>

      <Marquee dark items={BM_SERVES} />

      <section className="wrap tm-quote">
        <Media img="arch-timeless" reveal="left" />
        <div>
          <Eyebrow n="09">The Concord Pacific Advantage</Eyebrow>
          <p className="display" data-split>We don't just sell building materials. <em>We understand buildings.</em></p>
          <p className="lead" data-fade>A beautiful product isn't enough. It has to arrive when it's needed. It has to install properly. It has to meet the project's specifications. It has to perform. And ultimately, it has to make sense economically. That is why we look at every product through the combined perspective of a developer, builder, distributor and customer.</p>
        </div>
      </section>

      <section className="proc">
        <div className="wrap">
          <Eyebrow n="10" light>One integrated platform</Eyebrow>
          <h2 className="h1 light" data-split>Development. Construction. <em>Materials. Distribution.</em></h2>
          <div className="proc__grid" data-stagger>
            {BM_PLATFORM.map((p, i) => (
              <article className="proc__card" key={p.k}>
                <div className="proc__img"><img {...imgSrc(p.img, '(max-width: 900px) 50vw, 25vw')} alt={p.k} loading="lazy" /></div>
                <span>0{i + 1}</span>
                <h3>{p.k}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand img="roof-night-home" title={<>Let's build <em>better.</em></>} label="Discuss your project" />
    </div>
  )
}
