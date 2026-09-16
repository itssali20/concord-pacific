import { useRef } from 'react'
import useReveal from '../lib/useReveal'
import { PageHero, Media, Eyebrow, CtaBand, Btn } from '../components/UI'
import { IMG } from '../data/site'

const POINTS = [
  ['Headquartered in Beverly Hills', 'At the center of one of the world’s most sophisticated luxury residential markets.'],
  ['Luxury residential & condominiums', 'From exceptional private estates to sophisticated condominium residences.'],
  ['Beverly Hills & Bel-Air', 'Our core markets — with select opportunities across Greater Los Angeles.'],
  ['An international team', 'Architects, structural and civil engineers, designers, consultants, builders and specialists.'],
  ['Disciplined development', 'Defined by exceptional architecture, sophisticated design and craftsmanship.'],
]

export default function Company() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHero img="loc-beverly-hills-entry" eyebrow="Beverly Hills, California" title={<>Concord Pacific, <em>Corp.</em></>} />
      <section className="wrap co">
        <div className="co__logo" data-img="center"><img src={IMG('logo-full')} alt="Concord Pacific Corp. logo" /></div>
        <div className="co__txt">
          <Eyebrow n="01">The Company</Eyebrow>
          <p className="intro__statement" data-words>Concord Pacific, Corp. is a privately held real estate development company specializing in exceptional luxury residential properties.</p>
          <p className="lead" data-fade>Based in Beverly Hills, California, the company focuses on select opportunities where architecture, location and development expertise can create extraordinary value.</p>
          <p data-fade>Our developments range from exceptional private estates to sophisticated condominium residences. We work with talented architects, engineers, designers, consultants and construction professionals from the United States and internationally.</p>
        </div>
      </section>
      <section className="co-quote">
        <Media img="estate-grand" reveal="center" parallax="10" className="co-quote__bg" />
        <div className="cta__shade" />
        <blockquote className="wrap">
          <p className="display light" data-split>Our objective is not simply to build. It is to create properties distinguished by <em>architecture, craftsmanship and enduring value.</em></p>
        </blockquote>
      </section>
      <section className="wrap co-team">
        <div className="co-team__img"><Media img="team-office" reveal="up" parallax="6" /></div>
        <div className="co-team__txt">
          <Eyebrow n="02">Our Team</Eyebrow>
          <h2 className="h2" data-split>Led by Roman Alexander, CEO — <em>exceptional development begins with exceptional people.</em></h2>
          <div data-fade><Btn to="/international-team">Meet the team</Btn></div>
        </div>
        <div className="co-team__img co-team__img--b"><Media img="construction-team-tall" reveal="up" parallax="8" /></div>
      </section>
      <section className="wrap co-pts">
        <Eyebrow n="03">At a glance</Eyebrow>
        <div className="co-pts__list">
          {POINTS.map(([t, d], i) => (
            <div className="co-pt" key={t}>
              <span className="co-pt__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3" data-split>{t}</h3>
              <p data-fade>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand img="estate-heritage" />
    </div>
  )
}
