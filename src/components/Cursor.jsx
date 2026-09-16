import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e) => {
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY)
      const t = e.target.closest?.('[data-cursor],[data-hover],a,button,input,select,textarea')
      const text = t?.dataset?.cursor
      ring.current.classList.toggle('is-hover', !!t && !text)
      ring.current.classList.toggle('is-label', !!text)
      if (text) label.current.textContent = text
    }
    const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 })
    const enter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 })
    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])
  return (
    <>
      <div className="cur-dot" ref={dot} aria-hidden="true" />
      <div className="cur-ring" ref={ring} aria-hidden="true"><span ref={label} /></div>
    </>
  )
}
