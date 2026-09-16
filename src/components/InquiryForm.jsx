import { useState } from 'react'
import { INQUIRY_TYPES, CONTACT } from '../data/site'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

function F({ name, label, type = 'text', req, full, errors }) {
  return (
    <label className={`fld ${full ? 'fld--full' : ''} ${errors[name] ? 'has-err' : ''}`}>
      <input name={name} type={type} placeholder=" " required={req} autoComplete={name === 'telephone' ? 'tel' : name} />
      <span>{label}{req && ' *'}</span>
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  )
}

export default function InquiryForm({ defaultType = INQUIRY_TYPES[0], context, dark }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const submit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries())
    const errs = {}
    if (!data.name?.trim()) errs.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) errs.email = 'Please enter a valid email'
    if (!data.message?.trim()) errs.message = 'Please add a short message'
    setErrors(errs)
    if (Object.keys(errs).length) return
    if (context) data.project = context
    setStatus('sending')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        if (!res.ok) throw new Error('Request failed')
      } else {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${data.type} — ${data.name}`)}&body=${encodeURIComponent(body)}`
      }
      setStatus('sent')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={`form-done ${dark ? 'is-dark' : ''}`}>
        <p className="h3">Thank you.</p>
        <p>Your inquiry has been received. A member of our team will respond with discretion shortly.</p>
        <button className="link" onClick={() => setStatus('idle')}>Send another inquiry</button>
      </div>
    )
  }

  return (
    <form className={`form ${dark ? 'form--dark' : ''}`} onSubmit={submit} noValidate>
      <F name="name" label="Name" req errors={errors} />
      <F name="company" label="Company" errors={errors} />
      <F name="email" label="Email" type="email" req errors={errors} />
      <F name="telephone" label="Telephone" type="tel" errors={errors} />
      <label className="fld fld--full fld--select">
        <select name="type" defaultValue={defaultType}>
          {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <span>Nature of Inquiry</span>
      </label>
      <label className={`fld fld--full ${errors.message ? 'has-err' : ''}`}>
        <textarea name="message" rows="4" placeholder=" " required />
        <span>Message *</span>
        {errors.message && <small>{errors.message}</small>}
      </label>
      <div className="form__foot">
        <p className="muted small">All inquiries are handled in strict confidence.</p>
        <button type="submit" className={`btn ${dark ? 'btn--light' : 'btn--dark'}`} disabled={status === 'sending'} data-hover>
          <span>{status === 'sending' ? 'Sending…' : 'Submit'}</span><i className="btn__arrow" />
        </button>
      </div>
      {status === 'error' && <p className="form__err">Something went wrong. Please email {CONTACT.email}.</p>}
    </form>
  )
}
