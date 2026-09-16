import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, reduceMotion } from '../lib/gsap'
import { introDone } from '../lib/intro'
import useReveal from '../lib/useReveal'
import { TLink } from './Transition'
import { IMG } from '../data/site'

export function Media({ img, alt = '', reveal = 'up', parallax, className = '', eager, cursor }) {
  return (
    <div className={`media ${className}`} data-img={reveal || undefined} data-cursor={cursor}>
      <div className="media__in" data-parallax={parallax}>
        <img src={IMG(img)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
    </div>
  )
}

export function Btn({ to, href, children, variant = '', onClick, type }) {
  const inner = (<><span>{children}</span><i className="btn__arrow" /></>)
  const cls = `btn ${variant}`
  if (to) return <TLink to={to} className={cls} data-hover>{inner}</TLink>
  if (href) return <a href={href} className={cls} data-hover>{inner}</a>
  return <button type={type || 'button'} className={cls} onClick={onClick} data-hover>{inner}</button>
}

export function Eyebrow({ n, children, light }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`} data-fade>
      {n && <span className="eyebrow__n">{n}</span>}{children}
    </p>
  )
}

/** Full-bleed page hero with split title, cinematic zoom and scroll-out */
export function PageHero({ img, eyebrow, title, sub, align = 'bottom' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    let ctx, split
    const run = () => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(ref)
        split = SplitText.create(q('.ph__title'), { type: 'lines,words', mask: 'lines' })
        if (reduceMotion()) return
        gsap.timeline({ delay: 0.35 })
          .fromTo(q('.ph__media'), { clipPath: 'inset(12% 8% 12% 8%)', scale: 1.15 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 2, ease: 'expo.inOut' })
          .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.1, ease: 'expo.out' }, 0.9)
          .from(q('.ph__fade'), { autoAlpha: 0, y: 24, stagger: 0.1, duration: 1 }, 1.2)
        gsap.to(q('.ph__media img'), { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to(q('.ph__content'), { yPercent: -30, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'center center', end: 'bottom top', scrub: true } })
      }, ref)
    }
    let alive = true
    Promise.all([introDone, document.fonts?.ready]).then(() => alive && run())
    return () => { alive = false; ctx && ctx.revert(); split && split.revert() }
  }, [])
  return (
    <section className={`ph ph--${align}`} ref={ref}>
      <div className="ph__media"><img src={IMG(img)} alt="" fetchpriority="high" /></div>
      <div className="ph__shade" />
      <div className="ph__content wrap">
        {eyebrow && <p className="eyebrow eyebrow--light ph__fade">{eyebrow}</p>}
        <h1 className="ph__title">{title}</h1>
        {sub && <p className="ph__sub ph__fade">{sub}</p>}
      </div>
      <div className="ph__scroll ph__fade"><span>Scroll</span><i /></div>
    </section>
  )
}

export function CtaBand({ title = <>Let’s create something <em>exceptional.</em></>, img = 'estate-fire-terrace', to = '/contact', label = 'Contact our team' }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section className="cta" ref={ref}>
      <Media img={img} reveal="center" parallax="10" className="cta__bg" />
      <div className="cta__shade" />
      <div className="cta__in wrap">
        <Eyebrow light>Concord Pacific, Corp.</Eyebrow>
        <h2 className="h1 light" data-split>{title}</h2>
        <div data-fade="0.2"><Btn to={to} variant="btn--light">{label}</Btn></div>
      </div>
    </section>
  )
}

export function Marquee({ items, dark }) {
  const row = items.map((t, i) => (<span key={i} className="mq__item">{t}<i className="mq__dot" /></span>))
  return (
    <div className={`mq ${dark ? 'mq--dark' : ''}`} aria-hidden="true">
      <div className="mq__track">{row}{row}</div>
    </div>
  )
}
