import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, SplitText, reduceMotion } from '../lib/gsap'
import { introDone } from '../lib/intro'
import useReveal from '../lib/useReveal'
import { Media, VideoMedia, Btn, Eyebrow, Marquee, CtaBand } from '../components/UI'
import { TLink } from '../components/Transition'
import useSEO from '../lib/useSEO'
import { IMG, HERO_SLIDES, LOCATIONS, PILLARS, OPP_TYPES, CONTACT, MATERIALS, PROCESS, CEO } from '../data/site'
import { DEVELOPMENTS } from '../data/developments'

/* ───────────── HERO ───────────── */
function Hero() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)

  useLayoutEffect(() => {
    let ctx, split, alive = true
    ref.current.setAttribute('data-scope', '')
    const setup = () => {
      if (!alive) return
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(ref)
        const slides = q('.hero__slide')
        const bars = q('.hero__bar i')
        split = SplitText.create(q('.hero__word'), { type: 'chars', charsClass: 'hc' })
        const rm = reduceMotion()
        gsap.set(slides, { autoAlpha: 0 })
        gsap.set(slides[0], { autoAlpha: 1 })
        if (!rm) {
          gsap.set(split.chars, { yPercent: 120, rotate: 8 })
          gsap.set(q('.hero__rule'), { scaleX: 0 })
          gsap.set(q('.hero__in, .hero__meta > *, .hero__scroll'), { autoAlpha: 0, y: 24 })
          gsap.set(q('.hero__frame'), { scale: 1.25 })
        }

        // scroll: the full-bleed frame contracts into an architectural window
        const mm = gsap.matchMedia()
        mm.add({ desk: '(min-width: 900px)', mob: '(max-width: 899px)' }, (c) => {
          if (rm) return
          const inset = c.conditions.desk ? 'inset(16% 27% 16% 27% round 4px)' : 'inset(22% 7% 26% 7% round 4px)'
          const tl = gsap.timeline({
            scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=140%', scrub: 1, pin: true, anticipatePin: 1 },
          })
          tl.fromTo(q('.hero__frame'), { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: inset, ease: 'power2.inOut', duration: 1 }, 0)
            .to(q('.hero__slides'), { scale: 1.25, ease: 'none', duration: 1 }, 0)
            .to(q('.hero__shade'), { opacity: 0.15, duration: 0.6 }, 0)
            .to(q('.hero__word--a .hc'), { xPercent: -80, opacity: 0, stagger: { each: 0.02, from: 'end' }, duration: 0.45 }, 0)
            .to(q('.hero__word--b .hc'), { xPercent: 80, opacity: 0, stagger: 0.02, duration: 0.45 }, 0)
            .fromTo(q('.hero__fadeout'), { opacity: 1 }, { opacity: 0, duration: 0.25, immediateRender: false }, 0)
            .to(q('.hero__meta'), { opacity: 0, duration: 0.25 }, 0)
            .fromTo(q('.hero__after-l'), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 0.45 }, 0.5)
            .fromTo(q('.hero__after-r'), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.45 }, 0.56)
            .fromTo(q('.hero__after-c'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.7)
        })
        if (rm) return

        // cinematic slideshow: wipe + slow push-in
        let cur = 0
        const DUR = 6.5
        const play = (i) => {
          gsap.fromTo(slides[i].querySelector('img'), { scale: 1.18, xPercent: 0 }, { scale: 1.02, duration: DUR + 1.8, ease: 'none', overwrite: 'auto' })
          gsap.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none', onComplete: next })
        }
        const next = () => {
          const prev = cur
          cur = (cur + 1) % slides.length
          setIdx(cur)
          gsap.set(bars, { scaleX: 0 })
          gsap.set(slides, { zIndex: 0 })
          gsap.set(slides[prev], { zIndex: 1 })
          gsap.set(slides[cur], { zIndex: 2, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 100%)' })
          gsap.to(slides[cur], {
            clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut',
            onComplete: () => gsap.set(slides[prev], { autoAlpha: 0 }),
          })
          gsap.to(slides[prev].querySelector('img'), { xPercent: -8, duration: 1.8, ease: 'expo.inOut' })
          play(cur)
        }

        introDone.then(() => {
          if (!alive) return
          ctx.add(() => {
            gsap.timeline()
              .to(q('.hero__frame'), { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
              .to(split.chars, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.045, ease: 'expo.out' }, 0.25)
              .to(q('.hero__rule'), { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.6)
              .to(q('.hero__in'), { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.2 }, 0.9)
              .to(q('.hero__meta > *, .hero__scroll'), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1 }, 1.2)
            play(0)
          })
        })
      }, ref)
    }
    ;(document.fonts?.ready || Promise.resolve()).then(setup)
    return () => { alive = false; ctx && ctx.revert(); split && split.revert() }
  }, [])

  const s = HERO_SLIDES[idx]
  return (
    <section className="hero" ref={ref}>
      <div className="hero__frame">
        <div className="hero__slides">
        {HERO_SLIDES.map((h, i) => (
          <div className="hero__slide" key={h.img}>
            <img src={IMG(h.img)} alt={h.note} fetchpriority={i === 0 ? 'high' : 'low'} />
          </div>
        ))}
        </div>
        <div className="hero__shade" />
      </div>

      <div className="hero__content hero__fadeout-wrap">
        <p className="hero__in hero__fadeout eyebrow eyebrow--light">Beverly Hills, California</p>
        <h1 className="hero__title" aria-label="Concord Pacific">
          <span className="hero__word hero__word--a">Concord</span>
          <span className="hero__word hero__word--b">Pacific</span>
        </h1>
        <span className="hero__rule hero__fadeout" />
        <p className="hero__in hero__fadeout hero__tag">Exceptional Properties. <em>Extraordinary Living.</em></p>
        <div className="hero__in hero__fadeout"><Btn to="/developments" variant="btn--light">Explore our developments</Btn></div>
      </div>

      <div className="hero__meta">
        <div className="hero__count"><b>{String(idx + 1).padStart(2, '0')}</b> / {String(HERO_SLIDES.length).padStart(2, '0')}</div>
        <div className="hero__label"><span key={s.label}>{s.label}</span><small key={s.note}>{s.note}</small></div>
        <div className="hero__bars">{HERO_SLIDES.map((h) => <span className="hero__bar" key={h.img}><i /></span>)}</div>
      </div>
      <div className="hero__scroll hero__fadeout"><span>Scroll to discover</span><i /></div>

      <div className="hero__after hero__after-l"><span className="eyebrow">Est. Beverly Hills</span><p className="display">We develop<br />more than <em>properties.</em></p></div>
      <div className="hero__after hero__after-r"><p className="display">We create<br /><em>landmarks.</em></p><span className="eyebrow">34.0736° N · 118.4004° W</span></div>
      <div className="hero__after hero__after-c eyebrow">Luxury · Architecture · Vision · Enduring Value</div>
    </section>
  )
}

/* ───────────── INTRO ───────────── */
function Intro() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="intro wrap" ref={ref}>
      <Eyebrow n="01">Introduction</Eyebrow>
      <h2 className="intro__statement" data-words>
        Concord Pacific, Corp. is a Beverly Hills–based real estate development company dedicated to creating exceptional residences in some of Southern California’s most distinguished communities.
      </h2>
      <div className="intro__grid">
        <Media img="interior-kitchen" className="intro__img-a" parallax="8" />
        <div className="intro__copy">
          <p data-fade>From sophisticated condominium developments to extraordinary private estates, we approach every property with a singular objective: to realize its highest potential.</p>
          <p data-fade="0.1">Our developments bring together exceptional locations, distinctive architecture, sophisticated engineering, extraordinary interiors and uncompromising craftsmanship.</p>
          <div data-fade="0.2"><Btn to="/company">About the company</Btn></div>
        </div>
        <Media img="estate-viewpoint" className="intro__img-b" reveal="left" parallax="12" />
      </div>
      <Marquee items={['Luxury', 'Architecture', 'Vision', 'International Expertise', 'Exceptional Locations', 'Enduring Value']} />
    </section>
  )
}

/* ───────────── LOCATIONS ───────────── */
function Locations() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="locs" ref={ref}>
      <div className="wrap sect-head">
        <Eyebrow n="02">Featured Locations</Eyebrow>
        <h2 className="h1" data-split>Exceptional properties begin with <em>exceptional locations.</em></h2>
      </div>
      <div className="locs__row wrap" data-stagger>
        {LOCATIONS.map((l, i) => (
          <TLink to="/developments" key={l.name} className={`loc ${active === i ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)} data-cursor="Explore">
            <div className="loc__media"><img src={IMG(l.img)} alt={l.name} loading="lazy" /></div>
            <div className="loc__shade" />
            <span className="loc__n">0{i + 1}</span>
            <div className="loc__body">
              <span className="loc__coord">{l.coord}</span>
              <h3 className="loc__name">{l.name}</h3>
              <p className="loc__line">{l.line}</p>
            </div>
          </TLink>
        ))}
      </div>
    </section>
  )
}

/* ───────────── FEATURED DEVELOPMENTS (horizontal) ───────────── */
function Featured() {
  const ref = useRef(null)
  const feats = DEVELOPMENTS.filter((d) => d.featured)
  useReveal(ref, (q, rm) => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      if (rm) return
      const track = q('.hz__track')[0]
      const dist = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: q('.hz')[0], start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      q('.hz__card').forEach((card) => {
        gsap.fromTo(card.querySelector('img'), { xPercent: -10 }, {
          xPercent: 10, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
      gsap.to(q('.hz__progress i'), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('.hz')[0], start: 'top top', end: () => '+=' + dist(), scrub: true } })
    })
  })
  return (
    <section ref={ref} className="feat">
      <div className="hz">
        <div className="hz__track">
          <div className="hz__intro">
            <Eyebrow n="03">Featured Developments</Eyebrow>
            <h2 className="h1" data-split>Editorial <em>architecture,</em> realized.</h2>
            <p className="lead" data-fade>A select portfolio of private estates and condominium residences. Confidential projects are identified by location rather than street address.</p>
            <div data-fade><Btn to="/developments">All developments</Btn></div>
          </div>
          {feats.map((d, i) => (
            <TLink to={`/developments/${d.slug}`} className="hz__card" key={d.slug} data-cursor="View">
              <div className="hz__media"><img src={IMG(d.hero)} alt={d.name} loading="lazy" /></div>
              <div className="hz__info">
                <span className="hz__n">0{i + 1}</span>
                <div>
                  <p className="eyebrow">{d.area} · {d.type}</p>
                  <h3 className="h2">{d.name}</h3>
                </div>
                <span className="link-arrow">View development</span>
              </div>
            </TLink>
          ))}
          <div className="hz__end">
            <p className="display">Ten residences.<br /><em>One standard.</em></p>
            <Btn to="/developments">View the portfolio</Btn>
          </div>
        </div>
        <div className="hz__progress"><i /></div>
      </div>
    </section>
  )
}

/* ───────────── THE STANDARD (dark, pinned) ───────────── */
function Standard() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  useReveal(ref, (q, rm) => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      if (rm) return
      const imgs = q('.std__img')
      const descs = q('.std__desc')
      gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(descs.slice(1), { autoAlpha: 0, y: 30 })
      const n = PILLARS.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.std__pin')[0], start: 'top top', end: `+=${n * 70}%`, scrub: 1, pin: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.8 }, ease: 'power2.inOut' },
          onUpdate: (self) => setStep(Math.round(self.progress * (n - 1))),
        },
      })
      for (let i = 1; i < n; i++) {
        tl.to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }, i - 1)
          .fromTo(imgs[i].querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'power2.out', duration: 1 }, i - 1)
          .to(descs[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, i - 1)
          .to(descs[i], { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.5)
      }
    })
  })
  return (
    <section className="std" ref={ref}>
      <div className="std__pin">
        <div className="std__left">
          <Eyebrow n="04" light>The Concord Pacific Standard</Eyebrow>
          <h2 className="h1 light" data-split>Six disciplines. <em>One uncompromising</em> standard.</h2>
          <ol className="std__list">
            {PILLARS.map((p, i) => (
              <li key={p.t} className={step === i ? 'is-on' : ''}>
                <span>0{i + 1}</span>{p.t}
              </li>
            ))}
          </ol>
        </div>
        <div className="std__right">
          <div className="std__imgs">
            {PILLARS.map((p) => (
              <div className="std__img" key={p.t}><img src={IMG(p.img)} alt={p.t} loading="lazy" /></div>
            ))}
            <div className="std__counter"><b>0{step + 1}</b><span>/0{PILLARS.length}</span></div>
          </div>
          <div className="std__descs">
            {PILLARS.map((p) => (
              <div className="std__desc" key={p.t}>
                <img className="std__mimg" src={IMG(p.img)} alt="" loading="lazy" />
                <h3 className="h3 light">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── INTERNATIONAL TEAM ───────────── */
function TeamSection() {
  const ref = useRef(null)
  useReveal(ref, (q, rm) => {
    if (rm) return
    gsap.fromTo(q('.team__plans'), { clipPath: 'inset(0% 100% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: q('.team__plans')[0], start: 'top 85%', end: 'center 45%', scrub: true },
    })
    gsap.fromTo(q('.team__scan'), { left: '0%' }, {
      left: '100%', ease: 'none',
      scrollTrigger: { trigger: q('.team__plans')[0], start: 'top 85%', end: 'center 45%', scrub: true },
    })
  })
  return (
    <section className="team" ref={ref}>
      <div className="wrap team__grid">
        <div>
          <Eyebrow n="05">International Team</Eyebrow>
          <h2 className="h1" data-split>International talent. <em>One vision.</em></h2>
        </div>
        <div className="team__copy">
          <p className="lead" data-fade>Concord Pacific brings together a talented international multidisciplinary team of architects, structural engineers, civil engineers, interior designers, landscape designers, consultants, builders, craftsmen and development professionals.</p>
          <p data-fade="0.1">Each discipline contributes specialized expertise while working toward a unified architectural and development vision. Our international perspective draws upon ideas, materials, technologies and design influences from around the world — while remaining deeply connected to Beverly Hills, Bel-Air and Southern California.</p>
          <div data-fade="0.2"><Btn to="/international-team">Meet the disciplines</Btn></div>
        </div>
      </div>
      <div className="wrap team__photos">
        <figure className="team__ph team__ph--a">
          <Media img="team-office" parallax="6" cursor="Team" />
          <figcaption>The Concord Pacific development team · Beverly Hills</figcaption>
        </figure>
        <figure className="team__ph team__ph--b">
          <Media img="team-ceo-model" reveal="right" />
          <figcaption><b>{CEO.name}</b> · CEO, with architects and designers</figcaption>
        </figure>
        <figure className="team__ph team__ph--c">
          <Media img="construction-plans" reveal="up" parallax="6" />
          <figcaption>On site — architecture, engineering & construction</figcaption>
        </figure>
      </div>
      <div className="wrap">
        <div className="team__drawing">
          <div className="team__plans"><img src={IMG('plans-floors')} alt="Architectural floor plans" loading="lazy" /></div>
          <span className="team__scan" />
          <div className="team__labels">
            <span>P2 · Garage</span><span>P1 · Garage</span><span>L1 · Lobby</span><span>L2 · Residences</span><span>L3 · Residences</span><span>Roof · Pool Deck</span>
          </div>
        </div>
      </div>
      <Marquee dark items={['Architects', 'Structural Engineers', 'Civil Engineers', 'Interior Designers', 'Landscape Designers', 'Consultants', 'Builders', 'Craftsmen']} />
      <p className="team__quote wrap" data-split>Different disciplines. Different perspectives. <em>One standard of excellence.</em></p>
    </section>
  )
}

/* ───────────── SIGNATURE INTERIORS (parallax columns) ───────────── */
function Interiors() {
  const ref = useRef(null)
  const cols = [
    ['interior-kitchen', 'interior-closet', 'amenity-lobby'],
    ['interior-penthouse', 'materials-stone', 'interior-primary-suite', 'interior-wine-dining'],
    ['interior-theater', 'interior-living', 'condo-bath'],
  ]
  const tags = ['Custom kitchens', 'Natural stone', 'Bathrooms', 'Windows & glazing', 'Millwork', 'Closets', 'Wine rooms', 'Home theater', 'Staircases', 'Lighting', 'Pools', 'Outdoor living']
  useReveal(ref, (q, rm) => {
    if (rm) return
    const speeds = [-12, 14, -20]
    gsap.matchMedia().add('(min-width: 900px)', () => {
      q('.int__col').forEach((c, i) => {
        gsap.fromTo(c, { yPercent: -speeds[i] }, { yPercent: speeds[i], ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
    gsap.fromTo(q('.int__title'), { scale: 0.8 }, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  })
  return (
    <section className="int" ref={ref}>
      <div className="int__sticky">
        <Eyebrow n="07">Signature Interiors</Eyebrow>
        <h2 className="int__title">Every detail <em>matters.</em></h2>
        <div className="int__tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
        <Btn to="/signature-residences">View the galleries</Btn>
      </div>
      <div className="int__cols">
        {cols.map((c, i) => (
          <div className="int__col" key={i}>
            {c.map((img) => (
              <div className="int__item" key={img}><img src={IMG(img)} alt="" loading="lazy" /></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────────── DESIGN & MATERIALS ───────────── */
function MaterialsSection() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="hm-mat" ref={ref}>
      <div className="wrap hm-mat__head">
        <div>
          <Eyebrow n="08">Design & Materials</Eyebrow>
          <h2 className="h1" data-split>Kitchens. Baths. Windows. <em>Stone.</em></h2>
        </div>
        <div>
          <p className="lead" data-fade>Custom kitchens, spa bathrooms, floor-to-ceiling glazing, natural stone, millwork, lighting and landscape — every material is chosen for how it feels today and how it endures tomorrow.</p>
          <div data-fade="0.1"><Btn to="/design-and-materials">Explore design & materials</Btn></div>
        </div>
      </div>
      <div className="wrap hm-mat__grid" data-stagger>
        {MATERIALS.map((m, i) => (
          <TLink to="/design-and-materials" key={m.id} className={`hm-mat__card hm-mat__card--${i}`} data-cursor="Explore">
            <div className="hm-mat__img"><img src={IMG(m.img)} alt={m.t} loading="lazy" /></div>
            <div className="hm-mat__shade" />
            <div className="hm-mat__txt">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{m.t}</h3>
              <p>{m.line}</p>
            </div>
          </TLink>
        ))}
      </div>
    </section>
  )
}

/* ───────────── FILM: RESIDENCES IN MOTION ───────────── */
function Film() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="film" ref={ref}>
      <div className="wrap film__head">
        <Eyebrow n="09">Residences in Motion</Eyebrow>
        <h2 className="h1" data-split>Spaces that move <em>you.</em></h2>
        <p className="lead" data-fade>Architecture is experienced in movement — light travelling across stone, a room opening to the horizon. A closer look inside two signature interiors.</p>
      </div>
      <div className="wrap film__grid">
        <figure className="film__item film__item--full">
          <VideoMedia src="/videos/Fullvideo.mp4" alt="Concord Pacific — a cinematic tour of our residences" reveal="up" />
          <figcaption data-fade>
            <span>Film</span>
            <h3>The Concord Pacific experience.</h3>
            <p>A cinematic walkthrough of the craftsmanship, light and scale that define every residence.</p>
          </figcaption>
        </figure>
        <figure className="film__item film__item--a">
          <VideoMedia src="/videos/kitchen.mp4" poster="/videos/kitchen-poster.jpg" alt="Chef-grade kitchen with waterfall stone island" reveal="up" parallax="5" />
          <figcaption data-fade>
            <span>01 — Kitchen</span>
            <h3>Engineered like fine furniture.</h3>
            <p>Waterfall natural stone, custom millwork and professional appliances, opening to the terrace beyond.</p>
          </figcaption>
        </figure>
        <figure className="film__item film__item--b">
          <VideoMedia src="/videos/bedroom.mp4" poster="/videos/bedroom-poster.jpg" alt="Primary suite opening onto a sunset terrace" reveal="up" parallax="5" />
          <figcaption data-fade>
            <span>02 — Primary Suite</span>
            <h3>A private floor, open to the light.</h3>
            <p>Proportion, warmth and a wall of glass that dissolves into the California evening.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ───────────── CONSTRUCTION: FROM VISION TO REALITY ───────────── */
function Construction() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  useReveal(ref, (q, rm) => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      if (rm) return
      const imgs = q('.con__img')
      gsap.set(imgs.slice(1), { clipPath: 'inset(0% 0% 0% 100%)' })
      const n = PROCESS.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.con__pin')[0], start: 'top top', end: `+=${n * 60}%`, scrub: 1, pin: true,
          onUpdate: (self) => setStep(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
        },
      })
      tl.fromTo(q('.con__frame'), { clipPath: 'inset(8% 10% 8% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.out' }, 0)
      for (let i = 1; i < n; i++) {
        tl.to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, i - 0.6)
          .fromTo(imgs[i].querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1, ease: 'power2.out' }, i - 0.6)
      }
      tl.to(q('.con__bar i'), { scaleX: 1, ease: 'none', duration: n - 0.4 }, 0)
    })
  })
  return (
    <section className="con" ref={ref}>
      <div className="con__pin">
        <div className="con__frame">
          {PROCESS.map((p) => <div className="con__img" key={p.k}><img src={IMG(p.img)} alt={p.k} loading="lazy" /></div>)}
          <div className="con__shade" />
        </div>
        <div className="con__content wrap">
          <div className="con__top">
            <p className="eyebrow eyebrow--light"><span className="eyebrow__n">06</span>Construction</p>
            <h2 className="h1 light">From vision <em>to reality.</em></h2>
            <p className="lead light">Vision. Expertise. Execution. From the ground up, every discipline works toward one objective.</p>
          </div>
          <div className="con__steps">
            {PROCESS.map((p, i) => (
              <div className={`con__step ${step === i ? 'is-on' : ''}`} key={p.k}>
                <img className="con__mimg" src={IMG(p.img)} alt="" loading="lazy" />
                <span>0{i + 1}</span>
                <h3>{p.k}</h3>
                <p>{p.d}</p>
              </div>
            ))}
            <div className="con__bar"><i /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────── CALIFORNIA (expanding window) ───────────── */
function California() {
  const ref = useRef(null)
  useReveal(ref, (q, rm) => {
    if (rm) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=120%', scrub: 1, pin: true } })
    tl.fromTo(q('.cal__media'), { clipPath: 'inset(30% 34% 30% 34% round 200px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut' })
      .fromTo(q('.cal__media img'), { scale: 1.5 }, { scale: 1, ease: 'power2.inOut' }, 0)
      .fromTo(q('.cal__pre'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0)
      .fromTo(q('.cal__shade'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4)
      .fromTo(q('.cal__text > *'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0.6)
  })
  return (
    <section className="cal" ref={ref}>
      <p className="cal__pre display"><span>Indoor / Outdoor</span><em>California living</em></p>
      <div className="cal__media"><img src={IMG('estate-horizon')} alt="Indoor-outdoor California residence" loading="lazy" /></div>
      <div className="cal__shade" />
      <div className="cal__text wrap">
        <p className="eyebrow eyebrow--light"><span className="eyebrow__n">09</span>Indoor / Outdoor</p>
        <h2 className="h1 light">Designed around <em>California.</em></h2>
        <p className="lead light">Our residences celebrate the Southern California lifestyle through natural light, expansive glazing, terraces, gardens, pools and seamless connections between interior and exterior spaces.</p>
      </div>
    </section>
  )
}

/* ───────────── COMPANY STATEMENT ───────────── */
function Statement() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="stmt wrap" ref={ref}>
      <div className="stmt__media">
        <Media img="loc-beverly-hills-entry" parallax="10" />
        <div className="stmt__badge" data-fade><span>HQ</span>Beverly Hills<br />California</div>
      </div>
      <div className="stmt__body">
        <Eyebrow n="10">Company</Eyebrow>
        <h2 className="h1" data-split>Beverly Hills. Our home. <em>Our standard.</em></h2>
        <p className="lead" data-fade>Concord Pacific, Corp. is headquartered in Beverly Hills, California, placing the company at the center of one of the world’s most sophisticated luxury residential markets.</p>
        <p data-fade="0.1">Exceptional architecture, discretion, quality and attention to detail are not additions to our developments — they are fundamental to them.</p>
        <span className="rule" data-line />
        <dl className="stmt__facts" data-stagger>
          <div><dt>Headquarters</dt><dd>Beverly Hills</dd></div>
          <div><dt>Core Markets</dt><dd>Beverly Hills · Bel-Air</dd></div>
          <div><dt>Focus</dt><dd>Estates & Condominiums</dd></div>
        </dl>
      </div>
    </section>
  )
}

/* ───────────── OPPORTUNITIES (hover list) ───────────── */
function Opps() {
  const ref = useRef(null)
  const imgs = ['estate-viewpoint', 'estate-summit', 'condo-facade', 'estate-reserve', 'loc-bel-air', 'estate-heritage', 'loc-century-city', 'estate-oakridge']
  const [hover, setHover] = useState(-1)
  const follow = useRef(null)
  useLayoutEffect(() => {
    if (!follow.current) return
    const xt = gsap.quickTo(follow.current, 'x', { duration: 0.6, ease: 'power3' })
    const yt = gsap.quickTo(follow.current, 'y', { duration: 0.6, ease: 'power3' })
    const el = ref.current
    const mv = (e) => { const r = el.getBoundingClientRect(); xt(e.clientX - r.left); yt(e.clientY - r.top) }
    el.addEventListener('pointermove', mv)
    return () => el.removeEventListener('pointermove', mv)
  }, [])
  useReveal(ref)
  return (
    <section className="opps" ref={ref}>
      <div className="wrap opps__head">
        <Eyebrow n="11">Development Opportunities</Eyebrow>
        <h2 className="h1" data-split>Let’s create something <em>exceptional.</em></h2>
        <p className="lead" data-fade>A discreet acquisition and business-development practice for owners, brokers, investors and partners.</p>
      </div>
      <ul className="opps__list wrap" onMouseLeave={() => setHover(-1)}>
        {OPP_TYPES.map((t, i) => (
          <li key={t} onMouseEnter={() => setHover(i)} data-fade={i * 0.03}>
            <TLink to="/opportunities" className="opps__item" data-hover>
              <span className="opps__n">0{i + 1}</span>
              <span className="opps__t">{t}</span>
              <span className="opps__arrow" />
            </TLink>
          </li>
        ))}
      </ul>
      <div className={`opps__follow ${hover >= 0 ? 'is-on' : ''}`} ref={follow} aria-hidden="true">
        {imgs.map((im, i) => <img key={im} src={IMG(im)} alt="" className={hover === i ? 'is-on' : ''} loading="lazy" />)}
      </div>
      <div className="wrap opps__cta" data-fade>
        <Btn to="/opportunities" variant="btn--dark">Submit an opportunity</Btn>
        <a className="link-arrow" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </div>
    </section>
  )
}

export default function Home() {
  useSEO({
    description: 'Concord Pacific, Corp. is a Beverly Hills real estate development company creating exceptional private estates and luxury condominium residences in Beverly Hills, Bel-Air and Greater Los Angeles.',
    path: '/',
    image: '/images/estate-pool-sunset.webp',
  })
  useLayoutEffect(() => { const t = setTimeout(() => { ScrollTrigger.sort(); ScrollTrigger.refresh() }, 800); return () => clearTimeout(t) }, [])
  return (
    <div>
      <Hero />
      <Intro />
      <Locations />
      <Featured />
      <Standard />
      <TeamSection />
      <Construction />
      <Interiors />
      <MaterialsSection />
      <Film />
      <California />
      <Statement />
      <Opps />
      <CtaBand img="estate-grand" title={<>Exceptional properties. <em>Extraordinary living.</em></>} label="Developments" to="/developments" />
    </div>
  )
}
