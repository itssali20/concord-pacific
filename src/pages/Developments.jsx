import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReveal from '../lib/useReveal'
import { PageHero, Eyebrow, CtaBand } from '../components/UI'
import { TLink } from '../components/Transition'
import { IMG } from '../data/site'
import { DEVELOPMENTS, FILTERS, STATUSES } from '../data/developments'
import useSEO from '../lib/useSEO'

export default function Developments() {
  useSEO({
    title: 'Developments',
    description: 'Private estates and condominium residences across Beverly Hills, Bel-Air and Greater Los Angeles. Explore the Concord Pacific, Corp. development portfolio.',
    path: '/developments',
    image: '/images/estate-heritage.webp',
  })
  const ref = useRef(null)
  const grid = useRef(null)
  const [filter, setFilter] = useState('All')
  useReveal(ref)

  const list = DEVELOPMENTS.filter((d) =>
    filter === 'All' ? true : STATUSES.includes(filter) ? d.status === filter : d.area === filter
  )

  useLayoutEffect(() => {
    if (!grid.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.dv', { autoAlpha: 0, y: 60, clipPath: 'inset(20% 0% 0% 0%)' }, {
        autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.07, ease: 'expo.out',
        onComplete: () => ScrollTrigger.refresh(),
      })
    }, grid)
    return () => ctx.revert()
  }, [filter])

  return (
    <div ref={ref}>
      <PageHero img="estate-heritage" eyebrow="Our Developments" title={<>Exceptional properties begin with <em>exceptional locations.</em></>} sub="Private estates and condominium residences across Beverly Hills, Bel-Air and Greater Los Angeles." />
      <section className="wrap devs">
        <div className="devs__bar">
          <Eyebrow>{String(list.length).padStart(2, '0')} Developments</Eyebrow>
          <div className="filters" role="tablist" aria-label="Filter developments">
            {FILTERS.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className={`filter ${filter === f ? 'is-on' : ''}`} onClick={() => setFilter(f)} data-hover>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="devs__grid" ref={grid}>
          {list.map((d, i) => (
            <TLink to={`/developments/${d.slug}`} key={d.slug} className={`dv ${i % 5 === 0 ? 'dv--wide' : ''}`} data-cursor="View">
              <div className="dv__media"><img src={IMG(d.cover)} alt={d.name} loading="lazy" /></div>
              <div className="dv__meta">
                <span className={`pill pill--${d.status.replace(/\s/g, '').toLowerCase()}`}>{d.status}</span>
                <span className="eyebrow">{d.area} · {d.type}</span>
              </div>
              <h3 className="h3">{d.name}</h3>
              <div className="dv__foot">
                <span>{d.stats.map((s) => `${s[0]} ${s[1]}`).slice(0, 2).join(' · ')}</span>
                <span className="link-arrow">View development</span>
              </div>
            </TLink>
          ))}
          {!list.length && <p className="lead">New developments in this category will be announced soon.</p>}
        </div>
      </section>
      <CtaBand img="estate-summit" title={<>Have an exceptional <em>property?</em></>} to="/opportunities" label="Development opportunities" />
    </div>
  )
}
