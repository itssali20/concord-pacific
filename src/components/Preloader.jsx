import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, reduceMotion } from '../lib/gsap'
import { finishIntro } from '../lib/intro'
import { lockScroll } from './SmoothScroll'
import { IMG, HERO_SLIDES } from '../data/site'

export default function Preloader() {
  const root = useRef(null)
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    if (reduceMotion()) { setDone(true); finishIntro(); return }
    lockScroll(true)
    // warm the hero images while the loader runs
    const loads = HERO_SLIDES.map((s) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG(s.img) }))
    const counter = { v: 0 }
    const q = gsap.utils.selector(root)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      tl.fromTo(q('.pl__logo'), { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.4, ease: 'power2.out' })
        .from(q('.pl__sub'), { autoAlpha: 0, y: 10, duration: 0.8 }, 0.65)
        .to(counter, {
          v: 100, duration: 2.1, ease: 'power2.inOut',
          onUpdate: () => {
            const n = Math.round(counter.v)
            const c = root.current?.querySelector('.pl__count')
            if (c) c.textContent = String(n).padStart(3, '0')
            gsap.set(q('.pl__bar i'), { scaleX: counter.v / 100 })
          },
        }, 0.1)
      tl.play()
      const tlDone = new Promise((r) => tl.eventCallback('onComplete', r))
      Promise.all([tlDone, Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 4000))])]).then(() => {
        gsap.timeline({
          onComplete: () => { lockScroll(false); setDone(true) },
        })
          .to(q('.pl__inner'), { autoAlpha: 0, y: -30, duration: 0.6, ease: 'power2.in' })
          .to(q('.pl__col'), { yPercent: -100, duration: 1.1, stagger: 0.07, ease: 'expo.inOut' }, '-=0.1')
          .add(() => finishIntro(), '-=0.75')
      })
    }, root)
    return () => ctx.revert()
  }, [])

  if (done) return null
  return (
    <div className="pl" ref={root} role="status" aria-label="Loading">
      <div className="pl__cols">{[0, 1, 2, 3, 4].map((i) => <div className="pl__col" key={i} />)}</div>
      <div className="pl__inner">
        <img className="pl__logo" src={IMG('logo-header')} alt="Concord Pacific, Corp." />
        <div className="pl__sub">Beverly Hills, California</div>
        <div className="pl__foot">
          <span className="pl__count">000</span>
          <span className="pl__bar"><i /></span>
          <span>Exceptional Properties. Extraordinary Living.</span>
        </div>
      </div>
    </div>
  )
}
