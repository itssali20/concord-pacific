import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, CtaBand } from '../components/UI'
import { IMG, GALLERY } from '../data/site'
import useSEO from '../lib/useSEO'

const PRINCIPLES = [
  ['Architecture that inspires.', 'estate-summit'],
  ['Interiors that endure.', 'interior-great-room'],
  ['Materials selected without compromise.', 'interior-kitchen'],
  ['Spaces created around life.', 'interior-living'],
  ['Views transformed into architecture.', 'condo-rooftop-pool'],
  ['Privacy by design.', 'estate-reserve'],
]

export default function Residences() {
  useSEO({
    title: 'Signature Residences',
    description: 'The art of living well. Explore signature interiors, kitchens, primary suites and outdoor living spaces across the Concord Pacific, Corp. portfolio.',
    path: '/signature-residences',
    image: '/images/interior-great-room.webp',
  })
  const ref = useRef(null)
  const gal = useRef(null)
  const [cat, setCat] = useState('Kitchens')
  const [lightbox, setLightbox] = useState(null)
  useReveal(ref)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gal__item', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: 0.08, ease: 'expo.inOut' })
      gsap.fromTo('.gal__item img', { scale: 1.3 }, { scale: 1, duration: 1.6, stagger: 0.08, ease: 'expo.out' })
    }, gal)
    return () => ctx.revert()
  }, [cat])

  return (
    <div ref={ref}>
      <PageHero img="interior-great-room" eyebrow="Signature Residences" title={<>The art of <em>living well.</em></>} />

      <section className="mag wrap">
        {PRINCIPLES.map(([t, img], i) => (
          <article className={`mag__row ${i % 2 ? 'is-rev' : ''}`} key={t}>
            <Media img={img} className="mag__img" parallax="10" reveal={i % 2 ? 'right' : 'left'} />
            <div className="mag__txt">
              <span className="mag__n">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="h1" data-split>{t}</h2>
            </div>
          </article>
        ))}
      </section>

      <section className="gal wrap">
        <div className="sect-head">
          <Eyebrow>Galleries</Eyebrow>
          <h2 className="h1" data-split>Every detail <em>matters.</em></h2>
        </div>
        <div className="filters" role="tablist">
          {Object.keys(GALLERY).map((k) => (
            <button key={k} className={`filter ${cat === k ? 'is-on' : ''}`} onClick={() => setCat(k)} role="tab" aria-selected={cat === k} data-hover>{k}</button>
          ))}
        </div>
        <div className="gal__grid" ref={gal} key={cat}>
          {GALLERY[cat].map((img, i) => (
            <button className={`gal__item gal__item--${i}`} key={img + i} onClick={() => setLightbox(img)} data-cursor="Enlarge">
              <img src={IMG(img)} alt={`${cat} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="lb" onClick={() => setLightbox(null)} role="dialog" aria-label="Image preview">
          <img src={IMG(lightbox)} alt="" />
          <button className="lb__close" aria-label="Close">Close</button>
        </div>
      )}

      <CtaBand img="interior-primary-suite" title={<>Interiors that <em>endure.</em></>} label="Private inquiry" />
    </div>
  )
}
