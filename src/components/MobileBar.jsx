import { TLink } from './Transition'
import { CONTACT } from '../data/site'

export default function MobileBar() {
  return (
    <div className="mbar">
      <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className="mbar__btn">Call</a>
      <TLink to="/contact" className="mbar__btn mbar__btn--solid">Private Inquiry</TLink>
    </div>
  )
}
