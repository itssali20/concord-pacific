import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { TLink } from './Transition'
import { NAV, CONTACT, IMG } from '../data/site'
import { lockScroll } from './SmoothScroll'

export function Wordmark({ small }) {
  return (
    <img
      className={`wordmark ${small ? 'wordmark--sm' : ''}`}
      src={IMG('logo-header')}
      alt="Concord Pacific, Corp."
    />
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const menu = useRef(null)
  const tl = useRef(null)
  const { pathname } = useLocation()
  const [hoverImg, setHoverImg] = useState('estate-grand')

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        setSolid(self.scroll() > 80)
        setHidden(self.direction === 1 && self.scroll() > 400)
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const q = gsap.utils.selector(menu)
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
        .fromTo(q('.menu__link span'), { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.05, ease: 'expo.out' }, 0.45)
        .fromTo(q('.menu__media'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.35)
        .fromTo(q('.menu__aside > *'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.8 }, 0.7)
    }, menu)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!tl.current) return
    if (open) { tl.current.timeScale(1).play(); lockScroll(true) }
    else { tl.current.timeScale(1.6).reverse(); lockScroll(false) }
  }, [open])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header className={`hdr ${solid ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <TLink to="/" className="hdr__logo" aria-label="Concord Pacific, Corp. home"><Wordmark /></TLink>
        <nav className="hdr__nav" aria-label="Primary">
          {NAV.filter((n) => ['/developments', '/signature-residences', '/design-and-materials', '/international-team', '/our-vision'].includes(n.to)).map((n) => (
            <TLink key={n.to} to={n.to} className={`hdr__link ${pathname.startsWith(n.to) ? 'is-active' : ''}`} data-hover>
              {n.short || n.label}
            </TLink>
          ))}
        </nav>
        <div className="hdr__right">
          <TLink to="/contact" className="hdr__cta" data-hover>Inquire</TLink>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" data-hover>
            <span className="burger__label">{open ? 'Close' : 'Menu'}</span>
            <span className="burger__lines"><i /><i /></span>
          </button>
        </div>
      </header>

      <div className="menu" ref={menu} aria-hidden={!open}>
        <div className="menu__media">
          <img src={IMG(hoverImg)} alt="" />
        </div>
        <nav className="menu__nav">
          {NAV.map((n, i) => (
            <TLink key={n.to} to={n.to} className={`menu__link ${pathname === n.to ? 'is-active' : ''}`}
              onMouseEnter={() => setHoverImg(['estate-grand', 'estate-heritage', 'interior-kitchen', 'materials-stone', 'estate-summit', 'construction-team-tall', 'team-office', 'estate-viewpoint', 'estate-fire-terrace'][i])}
              onClick={() => setOpen(false)} data-hover>
              <span><em>{String(i + 1).padStart(2, '0')}</em>{n.label}</span>
            </TLink>
          ))}
        </nav>
        <aside className="menu__aside">
          <p className="eyebrow">Headquarters</p>
          <p>Concord Pacific, Corp.<br />{CONTACT.city}</p>
          <p className="eyebrow">Inquiries</p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br /><a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}>{CONTACT.phone}</a></p>
          <p className="menu__tag">Exceptional Properties.<br /><em>Extraordinary Living.</em></p>
        </aside>
      </div>
    </>
  )
}
