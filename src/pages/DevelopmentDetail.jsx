import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, Btn } from '../components/UI'
import { TLink } from '../components/Transition'
import InquiryForm from '../components/InquiryForm'
import NotFound from './NotFound'
import { IMG } from '../data/site'
import { DEVELOPMENTS, getDev } from '../data/developments'

const SECTIONS = ['Vision', 'Architecture', 'Residences', 'Interiors', 'Details', 'Location', 'Team', 'Inquiries']

export default function DevelopmentDetail() {
  const { slug } = useParams()
  const d = getDev(slug)
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useReveal(ref, (q, rm) => {
    q('.pd__sec').forEach((sec, i) => {
      ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) })
    })
    if (rm) return
    q('.pd__stat b').forEach((b) => {
      const target = parseFloat(b.dataset.v.replace(/,/g, ''))
      const o = { v: 0 }
      gsap.to(o, {
        v: target, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: b, start: 'top 90%' },
        onUpdate: () => { b.textContent = Math.round(o.v).toLocaleString('en-US') },
      })
    })
    const strip = q('.pd__strip-track')[0]
    if (strip) {
      gsap.to(strip, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: strip, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
  }, [slug])

  useEffect(() => { setActive(0) }, [slug])
  if (!d) return <NotFound />

  const idx = DEVELOPMENTS.indexOf(d)
  const next = DEVELOPMENTS[(idx + 1) % DEVELOPMENTS.length]
  const go = (i) => {
    const el = document.getElementById(`pd-${SECTIONS[i].toLowerCase()}`)
    if (!el) return
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="pd">
      <PageHero img={d.hero} eyebrow={`${d.area}, California · ${d.type}`} title={d.name} sub={d.tagline} />

      <div className="pd__stats wrap">
        {d.stats.map(([v, l]) => (
          <div className="pd__stat" key={l}><b data-v={v}>{v}</b><span>{l}</span></div>
        ))}
        <div className="pd__stat"><span className={`pill pill--${d.status.replace(/\s/g, '').toLowerCase()}`}>{d.status}</span><span>Status</span></div>
      </div>

      <div className="pd__layout wrap">
        <nav className="pd__nav" aria-label="Project sections">
          {SECTIONS.map((s, i) => (
            <button key={s} className={active === i ? 'is-on' : ''} onClick={() => go(i)} data-hover>
              <span>0{i + 1}</span>{s}
            </button>
          ))}
        </nav>

        <div className="pd__body">
          <section className="pd__sec" id="pd-vision">
            <Eyebrow n="01">The Vision</Eyebrow>
            <h2 className="h2" data-split>{d.vision}</h2>
          </section>

          <section className="pd__sec" id="pd-architecture">
            <Eyebrow n="02">The Architecture</Eyebrow>
            <Media img={d.gallery[0]} className="pd__wide" parallax="8" />
            <p className="lead" data-fade>{d.architecture}</p>
          </section>

          <section className="pd__sec" id="pd-residences">
            <Eyebrow n="03">The Residences</Eyebrow>
            <div className="pd__two">
              <Media img={d.gallery[1]} reveal="left" />
              <div>
                <h3 className="h3" data-split>Spaces created around life.</h3>
                <p data-fade>{d.residences}</p>
              </div>
            </div>
          </section>

          <section className="pd__sec" id="pd-interiors">
            <Eyebrow n="04">The Interiors</Eyebrow>
            <h3 className="h3" data-split>Kitchens, baths, millwork, materials and finishes — <em>selected without compromise.</em></h3>
            <div className="pd__strip"><div className="pd__strip-track">
              {[...d.gallery.slice(1), ...d.gallery.slice(1)].map((g, i) => (
                <div className="pd__strip-item" key={i}><img src={IMG(g)} alt="" loading="lazy" /></div>
              ))}
            </div></div>
          </section>

          <section className="pd__sec" id="pd-details">
            <Eyebrow n="05">The Details</Eyebrow>
            <ul className="pd__features" data-stagger>
              {d.features.map((f) => <li key={f}><i />{f}</li>)}
            </ul>
          </section>

          <section className="pd__sec" id="pd-location">
            <Eyebrow n="06">The Location</Eyebrow>
            <div className="pd__two">
              <div>
                <h3 className="h3" data-split>{d.area}, California</h3>
                <p data-fade>Confidential address — full location details are shared with qualified parties upon inquiry.</p>
              </div>
              <div className="pd__map" data-img="up">
                <iframe title={`Map of ${d.area}`} loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(d.area + ', CA')}&z=13&output=embed`} />
              </div>
            </div>
          </section>

          <section className="pd__sec" id="pd-team">
            <Eyebrow n="07">The Team</Eyebrow>
            <div className="pd__team" data-stagger>
              {d.team.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
            </div>
          </section>

          <section className="pd__sec pd__inq" id="pd-inquiries">
            <Eyebrow n="08">Inquiries</Eyebrow>
            <h3 className="h2" data-split>Private sales & development <em>inquiries.</em></h3>
            <InquiryForm defaultType="Sales Inquiries" context={d.name} />
          </section>
        </div>
      </div>

      <TLink to={`/developments/${next.slug}`} className="pd__next" data-cursor="Next">
        <img src={IMG(next.hero)} alt="" loading="lazy" />
        <div className="pd__next-in wrap">
          <span className="eyebrow eyebrow--light">Next development</span>
          <span className="h1 light">{next.name}</span>
        </div>
      </TLink>
      <div className="wrap pd__back"><Btn to="/developments">All developments</Btn></div>
    </div>
  )
}
