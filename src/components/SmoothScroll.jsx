import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/gsap'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
  return children
}

export const scrollToTop = () => {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}
export const lockScroll = (lock) => {
  const l = window.__lenis
  if (l) lock ? l.stop() : l.start()
  document.documentElement.classList.toggle('is-locked', lock)
}
