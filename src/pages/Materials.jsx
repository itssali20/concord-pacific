import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, CtaBand, Marquee } from '../components/UI'
import { IMG, MATERIALS } from '../data/site'
import useSEO from '../lib/useSEO'

export default function Materials() {
  useSEO({
    title: 'Design & Materials',
    description: 'Kitchens, bathrooms, windows, natural stone, millwork and landscape — the craft behind every Concord Pacific, Corp. residence.',
    path: '/design-and-materials',
    image: '/images/materials-stone.webp',
  })
  const ref = useRef(null)
  const [active, setActive] = useState(0)

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
    const el = document.getElementById(MATERIALS[i].id)
    if (!el) return
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={ref}>
      <PageHero img="materials-stone" eyebrow="Design & Materials" title={<>Every detail <em>matters.</em></>} sub="Kitchens, bathrooms, windows, natural stone, millwork and landscape — the craft behind every Concord Pacific residence." />

      <section className="wrap mt-intro">
        <Eyebrow n="01">Craftsmanship</Eyebrow>
        <p className="intro__statement" data-words>Materials and craftsmanship determine how a residence feels today — and how it endures tomorrow.</p>
        <div className="mt-index" data-stagger>
          {MATERIALS.map((m, i) => (
            <button key={m.id} className="mt-index__item" onClick={() => go(i)} data-cursor="View">
              <span className="mt-index__img"><img src={IMG(m.img)} alt="" loading="lazy" /></span>
              <span className="mt-index__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-index__t">{m.t}</span>
            </button>
          ))}
        </div>
      </section>

      <Marquee items={['Marble', 'Quartzite', 'Travertine', 'European Oak', 'Bronze', 'Limestone', 'Glass', 'Plaster']} />

      <div className="mt wrap">
        <nav className="mt__nav" aria-label="Categories">
          {MATERIALS.map((m, i) => (
            <button key={m.id} className={active === i ? 'is-on' : ''} onClick={() => go(i)} data-hover>
              <span>{String(i + 1).padStart(2, '0')}</span>{m.t}
            </button>
          ))}
        </nav>
        <div className="mt__body">
          {MATERIALS.map((m, i) => (
            <section className={`mt__sec ${i % 2 ? 'is-rev' : ''}`} id={m.id} key={m.id}>
              <div className="mt__media">
                <div style={m.ratio ? { aspectRatio: m.ratio } : undefined} className="mt__mainwrap"><Media img={m.img} parallax={m.ratio ? undefined : '8'} reveal={i % 2 ? 'right' : 'left'} className="mt__main" /></div>
                <div className="mt__alt"><img src={IMG(m.alt)} alt="" loading="lazy" /></div>
              </div>
              <div className="mt__txt">
                <span className="mt__n">{String(i + 1).padStart(2, '0')}</span>
                <p className="eyebrow">{m.line}</p>
                <h2 className="h1" data-split>{m.t}</h2>
                <p className="lead" data-fade>{m.d}</p>
                <ul className="mt__specs">
                  {m.specs.map((s) => <li key={s}><i />{s}</li>)}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand img="interior-kitchen" title={<>Materials selected <em>without compromise.</em></>} label="Private inquiry" />
    </div>
  )
}
