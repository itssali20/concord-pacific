import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Eyebrow, CtaBand } from '../components/UI'
import { IMG, VISION } from '../data/site'
import useSEO from '../lib/useSEO'

export default function Vision() {
  useSEO({
    title: 'Our Vision',
    description: 'Vision creates value. The principles behind Concord Pacific, Corp. — exceptional locations, architectural integrity, uncompromising quality and enduring value.',
    path: '/our-vision',
    image: '/images/estate-viewpoint.webp',
  })
  const ref = useRef(null)
  useReveal(ref, (q, rm) => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      if (rm) return
      const cards = q('.vc')
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return
        gsap.to(c, {
          scale: 0.9, filter: 'brightness(0.5)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 14%', scrub: true },
        })
      })
    })
  })
  return (
    <div ref={ref}>
      <PageHero img="estate-viewpoint" eyebrow="Our Vision" title={<>Vision creates <em>value.</em></>} />
      <section className="wrap vis-intro">
        <Eyebrow n="01">Philosophy</Eyebrow>
        <p className="intro__statement" data-words>Concord Pacific believes extraordinary development begins long before construction. It begins by recognizing possibilities others may not see.</p>
        <p className="lead vis-intro__p" data-fade>We study each property’s location, architecture, environment and market potential before developing a singular vision for what that property can become.</p>
      </section>
      <section className="vstack wrap">
        {VISION.map((v, i) => (
          <article className="vc" key={v.t}>
            <div className="vc__img"><img src={IMG(v.img)} alt="" loading="lazy" /></div>
            <div className="vc__body">
              <span className="vc__n">{String(i + 1).padStart(2, '0')} / 06</span>
              <h2 className="h1">{v.t}</h2>
              <p className="lead">{v.d}</p>
            </div>
          </article>
        ))}
      </section>
      <CtaBand img="estate-summit" title={<>Recognizing possibilities <em>others may not see.</em></>} label="Discuss an opportunity" to="/opportunities" />
    </div>
  )
}
