import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { TLink } from './Transition'
import { NAV, CONTACT } from '../data/site'

export default function Footer() {
  const ref = useRef(null)
  useReveal(ref, (q, rm) => {
    if (rm) return
    gsap.fromTo(q('.ftr__mega span'), { yPercent: 60 }, { yPercent: 0, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: q('.ftr__mega')[0], start: 'top bottom', end: 'bottom bottom', scrub: true } })
  })
  return (
    <footer className="ftr" ref={ref}>
      <div className="ftr__top wrap">
        <div>
          <p className="eyebrow eyebrow--light" data-fade>Concord Pacific, Corp. · Beverly Hills, California</p>
          <h2 className="ftr__title" data-split>Let’s create something <em>exceptional.</em></h2>
          <TLink to="/contact" className="btn btn--light" data-fade="0.2" data-hover><span>Begin a conversation</span><i className="btn__arrow" /></TLink>
        </div>
        <div className="ftr__cols" data-stagger>
          <div>
            <p className="eyebrow eyebrow--light">Explore</p>
            {NAV.slice(0, 4).map((n) => <TLink key={n.to} to={n.to} className="ftr__link" data-hover>{n.label}</TLink>)}
          </div>
          <div>
            <p className="eyebrow eyebrow--light">Company</p>
            {NAV.slice(4).map((n) => <TLink key={n.to} to={n.to} className="ftr__link" data-hover>{n.label}</TLink>)}
          </div>
          <div>
            <p className="eyebrow eyebrow--light">Contact</p>
            <a className="ftr__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a className="ftr__link" href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}>{CONTACT.phone}</a>
            <span className="ftr__link muted">{CONTACT.city}</span>
          </div>
        </div>
      </div>
      <div className="ftr__mega" aria-hidden="true">
        <span className="ftr__mega-a">Concord</span><span className="ftr__mega-b">Pacific</span>
      </div>
      <div className="ftr__bottom wrap">
        <span>© {new Date().getFullYear()} Concord Pacific, Corp. All rights reserved.</span>
        <span className="ftr__links">
          <TLink to="/developments">Developments</TLink><span>|</span>
          <TLink to="/opportunities">Opportunities</TLink><span>|</span>
          <TLink to="/contact">Contact</TLink>
        </span>
        <span>Exceptional Properties. Extraordinary Living.</span>
      </div>
    </footer>
  )
}
