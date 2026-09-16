import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, Marquee, CtaBand, Btn } from '../components/UI'
import { DISCIPLINES, CEO, PROCESS, IMG } from '../data/site'

const IMGS = ['estate-heritage', 'construction-site', 'construction-team-tall', 'interior-great-room', 'estate-fire-terrace', 'construction-plans', 'interior-theater']

export default function Team() {
  const ref = useRef(null)
  const [open, setOpen] = useState(0)
  useReveal(ref, (q, rm) => {
    if (rm) return
    gsap.fromTo(q('.ceo__frame img'), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: q('.ceo')[0], start: 'top bottom', end: 'bottom top', scrub: true } })
  })
  return (
    <div ref={ref}>
      <PageHero img="construction-team" eyebrow="International Team" title={<>International talent. <em>One vision.</em></>} sub="At Concord Pacific, Corp., exceptional development begins with exceptional people." />

      {/* Intro */}
      <section className="wrap tm-intro">
        <Eyebrow n="01">Our People</Eyebrow>
        <p className="intro__statement" data-words>Led by Roman Alexander, CEO, our development team brings together award-winning architects, designers, structural and civil engineers, construction professionals, consultants and specialists from the United States and around the world.</p>
        <div className="tm-intro__cols">
          <p className="lead" data-fade>Our international approach allows us to combine diverse architectural perspectives, advanced engineering, sophisticated interior design and innovative construction methods into one unified vision.</p>
          <p data-fade="0.1">From the earliest concept and architectural drawings through engineering, interiors, construction and final detailing, every discipline works collaboratively toward a common objective: creating extraordinary residences of lasting architectural and real estate value.</p>
        </div>
      </section>

      {/* CEO */}
      <section className="ceo">
        <div className="wrap ceo__grid">
          <div className="ceo__media">
            <div className="ceo__frame" data-img="up"><img src={IMG('team-ceo-model')} alt="Roman Alexander, CEO, reviewing a residence model with the design team" loading="lazy" /></div>
            <div className="ceo__frame ceo__frame--sm" data-img="left"><img src={IMG('team-ceo-office')} alt="Concord Pacific leadership in the Beverly Hills studio" loading="lazy" /></div>
          </div>
          <div className="ceo__txt">
            <Eyebrow n="02" light>Leadership</Eyebrow>
            <h2 className="h1 light" data-split>{CEO.name}</h2>
            <p className="ceo__role" data-fade>{CEO.role} · Concord Pacific, Corp.</p>
            {CEO.bio.map((b, i) => <p className="lead light" key={i} data-fade={i * 0.1}>{b}</p>)}
            <blockquote className="ceo__quote" data-fade="0.2">“Our objective is not simply to build. It is to create properties distinguished by architecture, craftsmanship and enduring value.”</blockquote>
          </div>
        </div>
      </section>

      {/* Team photos */}
      <section className="wrap tp">
        <div className="sect-head">
          <Eyebrow n="03">In the studio & on site</Eyebrow>
          <h2 className="h1" data-split>Award-winning design. <em>International expertise.</em></h2>
        </div>
        <div className="tp__grid">
          <figure className="tp__item tp__item--a"><Media img="team-office" reveal="left" /><figcaption>Planning, design & development — Beverly Hills studio</figcaption></figure>
          <figure className="tp__item tp__item--b"><Media img="construction-team-tall" reveal="up" /><figcaption>Site review with engineers and builders</figcaption></figure>
          <figure className="tp__item tp__item--c"><Media img="construction-site" reveal="up" /><figcaption>Structure & engineering</figcaption></figure>
          <figure className="tp__item tp__item--d"><Media img="team-ceo-model" reveal="right" /><figcaption>Architectural model review</figcaption></figure>
        </div>
        <p className="lead tp__p" data-fade>Our projects are strengthened by talented professionals selected for the specific requirements of each development. This multidisciplinary team may include award-winning architects and interior designers, structural engineers, civil engineers, landscape architects, lighting specialists, technology consultants, builders and master craftsmen.</p>
      </section>

      <Marquee dark items={['Architects', 'Interior Designers', 'Structural Engineers', 'Civil Engineers', 'Landscape Architects', 'Lighting Specialists', 'Technology Consultants', 'Builders', 'Master Craftsmen']} />

      {/* Disciplines */}
      <section className="wrap tm">
        <div className="tm__head">
          <Eyebrow n="04">The Disciplines</Eyebrow>
          <h2 className="h1" data-split>Global expertise. <em>Beverly Hills vision.</em></h2>
          <p className="lead" data-fade>Concord Pacific assembles exceptional professionals according to the unique requirements of each development.</p>
        </div>
        <div className="tm__grid">
          <div className="acc">
            {DISCIPLINES.map((d, i) => (
              <div className={`acc__item ${open === i ? 'is-open' : ''}`} key={d.t} data-fade={i * 0.04}>
                <button className="acc__btn" onClick={() => setOpen(i)} aria-expanded={open === i} data-hover>
                  <span className="acc__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="acc__t">{d.t}</span>
                  <span className="acc__plus" />
                </button>
                <div className="acc__panel"><p>{d.d}</p></div>
              </div>
            ))}
          </div>
          <div className="tm__visual">
            {IMGS.map((im, i) => (
              <img key={im} src={IMG(im)} alt="" className={open === i ? 'is-on' : ''} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="proc">
        <div className="wrap">
          <Eyebrow n="05" light>From vision to reality</Eyebrow>
          <h2 className="h1 light" data-split>Plan. Design. Build. <em>Deliver.</em></h2>
          <div className="proc__grid" data-stagger>
            {PROCESS.map((p, i) => (
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

      <section className="wrap tm-quote">
        <Media img="plans-floors" reveal="left" />
        <div>
          <p className="display" data-split>Different disciplines. Global perspectives. <em>One uncompromising standard.</em></p>
          <div data-fade><Btn to="/design-and-materials">Design & materials</Btn></div>
        </div>
      </section>
      <CtaBand img="construction-team" title={<>One project. One team. <em>One vision.</em></>} />
    </div>
  )
}
