import { createContext, useContext, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/gsap'
import { scrollToTop } from './SmoothScroll'

const Ctx = createContext({ go: () => {} })
export const useTransition = () => useContext(Ctx)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const el = useRef(null)
  const busy = useRef(false)
  const first = useRef(true)

  const go = useCallback((to) => {
    if (busy.current) return
    if (to === location.pathname + location.search) { window.__lenis?.scrollTo(0); return }
    if (reduceMotion()) { navigate(to); return }
    busy.current = true
    const panels = el.current.querySelectorAll('.pt__panel')
    gsap.timeline({
      onComplete: () => { navigate(to) },
    })
      .set(el.current, { pointerEvents: 'all', visibility: 'visible' })
      .fromTo(panels, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: 'expo.inOut' })
      .fromTo(el.current.querySelector('.pt__word'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3')
  }, [location, navigate])

  // reveal after route change
  useEffect(() => {
    if (first.current) { first.current = false; return }
    scrollToTop()
    const panels = el.current.querySelectorAll('.pt__panel')
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => { busy.current = false; gsap.set(el.current, { pointerEvents: 'none', visibility: 'hidden' }); ScrollTrigger.refresh() },
    })
    tl.to(el.current.querySelector('.pt__word'), { autoAlpha: 0, y: -20, duration: 0.4 })
      .to(panels, { scaleY: 0, transformOrigin: 'top', duration: 0.8, stagger: 0.08, ease: 'expo.inOut' }, '-=0.1')
    if (!busy.current) { tl.progress(1) }
  }, [location.pathname])

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div className="pt" ref={el} aria-hidden="true">
        <div className="pt__panel" /><div className="pt__panel" /><div className="pt__panel" />
        <div className="pt__word">Concord <em>Pacific</em></div>
      </div>
    </Ctx.Provider>
  )
}

export function TLink({ to, children, onClick, ...rest }) {
  const { go } = useTransition()
  return (
    <Link
      to={to}
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to)
      }}
    >
      {children}
    </Link>
  )
}
