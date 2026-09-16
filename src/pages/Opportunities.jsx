import { useRef, useState } from 'react'
import useReveal from '../lib/useReveal'
import { PageHero, Eyebrow } from '../components/UI'
import InquiryForm from '../components/InquiryForm'
import { IMG, OPPORTUNITIES, OPP_TYPES } from '../data/site'

export default function Opportunities() {
  const ref = useRef(null)
  const [topic, setTopic] = useState('Development Opportunities')
  const formRef = useRef(null)
  useReveal(ref)
  const pick = (t) => {
    setTopic(t)
    const el = formRef.current
    window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div ref={ref}>
      <PageHero img="estate-summit" eyebrow="Opportunities" title={<>Recognizing <em>possibility.</em></>} sub="A discreet acquisition and business-development practice." />
      <section className="wrap op">
        {OPPORTUNITIES.map((o, i) => (
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
      <section className="wrap op-types">
        <Eyebrow n="—">We consider</Eyebrow>
        <ul data-stagger>{OPP_TYPES.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>
      <section className="op-form" ref={formRef}>
        <div className="wrap op-form__in">
          <div>
            <Eyebrow light>Confidential Submission</Eyebrow>
            <h2 className="h1 light" data-split>Let’s create something <em>exceptional.</em></h2>
            <p className="lead light" data-fade>Share a property, a site or a partnership idea. Every submission is reviewed personally and in confidence.</p>
          </div>
          <InquiryForm key={topic} defaultType={topic} dark />
        </div>
      </section>
    </div>
  )
}
