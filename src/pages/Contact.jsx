import { useRef, useState } from 'react'
import useReveal from '../lib/useReveal'
import { Eyebrow, Media } from '../components/UI'
import InquiryForm from '../components/InquiryForm'
import { CONTACT, INQUIRY_TYPES } from '../data/site'
import useSEO from '../lib/useSEO'

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: `Contact Concord Pacific, Corp. in Beverly Hills, California. ${CONTACT.email} | ${CONTACT.phone}. All inquiries are handled in strict confidence.`,
    path: '/contact',
    image: '/images/estate-pool-tall.webp',
  })
  const ref = useRef(null)
  const [type, setType] = useState(INQUIRY_TYPES[0])
  useReveal(ref)
  return (
    <div ref={ref} className="ct">
      <div className="ct__media">
        <Media img="estate-pool-tall" reveal="up" eager />
        <div className="ct__card">
          <p className="eyebrow eyebrow--light">Concord Pacific, Corp.</p>
          <p className="h3 light">Beverly Hills, California</p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}>{CONTACT.phone}</a>
        </div>
      </div>
      <div className="ct__body">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="h1" data-split>Let’s create something <em>exceptional.</em></h1>
        <div className="ct__types" data-stagger>
          {INQUIRY_TYPES.map((t) => (
            <button key={t} className={`filter ${type === t ? 'is-on' : ''}`} onClick={() => setType(t)} data-hover>{t}</button>
          ))}
        </div>
        <InquiryForm key={type} defaultType={type} />
      </div>
    </div>
  )
}
