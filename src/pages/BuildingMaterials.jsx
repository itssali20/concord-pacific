import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, CtaBand, Marquee, Btn } from '../components/UI'
import InquiryForm from '../components/InquiryForm'
import { IMG, BM_PRODUCTS, BM_PLATFORM, BM_PRIORITIES, BM_SERVES, BM_AUDIENCES } from '../data/site'
import useSEO from '../lib/useSEO'

export default function BuildingMaterials() {
  useSEO({
    title: 'Building Materials & Distribution',
    description: 'Concord Pacific Corp. sources and distributes exceptional building materials and architectural products — kitchens, doors, windows, flooring and roofing — throughout California and the United States.',
    path: '/building-materials',
    image: '/images/materials-door-collage.webp',
  })
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const formRef = useRef(null)
  const [topic, setTopic] = useState('Building Materials & Distribution')

  useReveal(ref, (q, rm) => {
    q('.mt__sec').forEach((sec, i) => {
      ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) })
    })
    if (rm) return
    q('.mt__alt').forEach((el) => {
      gsap.fromTo(el, { yPercent: 25 }, { yPercent: -15, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    q('.mt__specs li').forEach((li) => {
      gsap.from(li, { x: -30, autoAlpha: 0, duration: 0.9, scrollTrigger: { trigger: li, start: 'top 92%' } })
    })
  })

  const go = (i) => {
    const el = document.getElementById(BM_PRODUCTS[i].id)
    if (!el) return
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' })
  }

  const pick = (t) => {
    setTopic(t)
    const el = formRef.current
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={ref}>
      <PageHero img="interior-living" eyebrow="Building Materials & Distribution" title={<>Building homes. <em>Supplying the materials that build them.</em></>} sub="Development, construction, global sourcing and building material distribution — under one experienced organization." />

      <section className="wrap tm-intro">
        <Eyebrow n="01">From the Developer's Perspective</Eyebrow>
        <p className="intro__statement" data-words>We don't approach building materials solely as a distributor. We are developers and builders ourselves.</p>
        <div className="tm-intro__cols">
          <p className="lead" data-fade>We understand how products perform in real construction environments and what developers and contractors need to successfully complete a project. We evaluate products from the perspective of the people who actually specify, purchase, install and live with them.</p>
          <p data-fade="0.1">We consider design, craftsmanship, engineering, durability, installation, energy efficiency, availability, manufacturing capacity, logistics, long-term performance and overall project value. Our objective is straightforward: find exceptional products and connect them with exceptional projects.</p>
        </div>
      </section>

      <Marquee items={['Kitchens', 'Doors', 'Garage Doors', 'Windows', 'Sliding Glass', 'Hardwood Flooring', 'Roofing']} />

      <section className="wrap mt-intro">
        <Eyebrow n="02">Our Products</Eyebrow>
        <p className="intro__statement" data-words>Quality materials for today's residential architecture.</p>
        <div className="mt-index" data-stagger>
          {BM_PRODUCTS.map((m, i) => (
            <button key={m.id} className="mt-index__item" onClick={() => go(i)} data-cursor="View">
              <span className="mt-index__img"><img src={IMG(m.img)} alt="" loading="lazy" /></span>
              <span className="mt-index__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-index__t">{m.t}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt wrap">
        <nav className="mt__nav" aria-label="Product categories">
          {BM_PRODUCTS.map((m, i) => (
            <button key={m.id} className={active === i ? 'is-on' : ''} onClick={() => go(i)} data-hover>
              <span>{String(i + 1).padStart(2, '0')}</span>{m.t}
            </button>
          ))}
        </nav>
        <div className="mt__body">
          {BM_PRODUCTS.map((m, i) => (
            <section className={`mt__sec ${i % 2 ? 'is-rev' : ''}`} id={m.id} key={m.id}>
              <div className="mt__media">
                <div className="mt__mainwrap"><Media img={m.img} parallax="8" reveal={i % 2 ? 'right' : 'left'} className="mt__main" /></div>
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
                  <div className="mt__gallery">
                    {m.gallery.map((im) => <img key={im} src={IMG(im)} alt="" loading="lazy" />)}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="wrap tm-quote">
        <Media img="construction-plans" reveal="left" />
        <div>
          <Eyebrow n="03">Global Sourcing</Eyebrow>
          <p className="display" data-split>We search the world for <em>exceptional products.</em></p>
          <p className="lead" data-fade>Some of the world's most remarkable building products are created by manufacturers that have not yet achieved their full potential in the United States. Concord Pacific Corp. is continuously searching worldwide for exceptional manufacturers, innovative companies and distinctive products that can bring greater quality, beauty, performance, technology and value to the American construction market.</p>
        </div>
      </section>

      <section className="wrap op-types">
        <Eyebrow n="04">What we look for</Eyebrow>
        <ul data-stagger>{BM_PRIORITIES.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <section className="wrap op">
        {BM_AUDIENCES.map((o, i) => (
          <article className="op__card" key={o.k} data-fade={i * 0.08}>
            <div className="op__img"><img src={IMG(o.img)} alt="" loading="lazy" /></div>
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
            <Eyebrow light>Let's build better</Eyebrow>
            <h2 className="h1 light" data-split>We build. We develop. <em>We search the world for exceptional products.</em></h2>
            <p className="lead light" data-fade>Whether you are sourcing materials for a project, designing an exceptional property, or manufacturing an innovative product for the global construction industry, we welcome the opportunity to hear from you.</p>
          </div>
          <InquiryForm key={topic} defaultType={topic} dark />
        </div>
      </section>

      <Marquee dark items={BM_SERVES} />

      <section className="wrap tm-quote">
        <Media img="arch-timeless" reveal="left" />
        <div>
          <Eyebrow n="05">The Concord Pacific Advantage</Eyebrow>
          <p className="display" data-split>We don't just sell building materials. <em>We understand buildings.</em></p>
          <p className="lead" data-fade>A beautiful product isn't enough. It has to arrive when it's needed. It has to install properly. It has to meet the project's specifications. It has to perform. And ultimately, it has to make sense economically. That is why we look at every product through the combined perspective of a developer, builder, distributor and customer.</p>
        </div>
      </section>

      <section className="proc">
        <div className="wrap">
          <Eyebrow n="06" light>One integrated platform</Eyebrow>
          <h2 className="h1 light" data-split>Development. Construction. <em>Materials. Distribution.</em></h2>
          <div className="proc__grid" data-stagger>
            {BM_PLATFORM.map((p, i) => (
              <article className="proc__card" key={p.k}>
                <div className="proc__img"><img src={IMG(p.img)} alt={p.k} loading="lazy" /></div>
                <span>0{i + 1}</span>
                <h3>{p.k}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand img="materials-roof-exterior" title={<>Let's build <em>better.</em></>} label="Discuss your project" />
    </div>
  )
}
