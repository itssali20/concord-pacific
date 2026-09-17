import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, reduceMotion } from '../lib/gsap'
import { finishIntro } from '../lib/intro'
import { lockScroll } from './SmoothScroll'
import { IMG, HERO_SLIDES } from '../data/site'

const VIDEO_SRC = '/videos/logo-intro.mp4'
const VIDEO_POSTER = '/videos/logo-intro-poster.jpg'
const PLAY_MS = 2200
const MAX_WAIT_MS = 6000

export default function Preloader() {
  const root = useRef(null)
  const video = useRef(null)
  const [done, setDone] = useState(false)

  const rm = reduceMotion()

  useLayoutEffect(() => {
    if (rm) {
      // respect no-motion: skip the animated timeline and video, but still
      // show the brand mark briefly instead of jumping straight to content
      lockScroll(true)
      const t = setTimeout(() => { lockScroll(false); setDone(true); finishIntro() }, 900)
      return () => clearTimeout(t)
    }
    lockScroll(true)
    // warm the hero images while the loader runs
    const loads = HERO_SLIDES.map((s) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG(s.img) }))
    const counter = { v: 0 }
    const q = gsap.utils.selector(root)
    const ctx = gsap.context(() => {
      const v = video.current
      // muted + playsInline keeps autoplay allowed; a rejected promise just leaves the poster up
      const played = v
        ? new Promise((r) => {
            v.addEventListener('ended', r, { once: true })
            const p = v.play()
            if (p && p.catch) p.catch(() => {})
            setTimeout(r, PLAY_MS + 400)
          })
        : Promise.resolve()

      const tl = gsap.timeline({ paused: true })
      tl.fromTo(q('.pl__video'), { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power2.out' })
        .to(counter, {
          v: 100, duration: PLAY_MS / 1000, ease: 'power1.inOut',
          onUpdate: () => {
            const n = Math.round(counter.v)
            const c = root.current?.querySelector('.pl__count')
            if (c) c.textContent = String(n).padStart(3, '0')
            gsap.set(q('.pl__bar i'), { scaleX: counter.v / 100 })
          },
        }, 0)
      tl.play()

      const tlDone = new Promise((r) => tl.eventCallback('onComplete', r))
      const ready = Promise.all([tlDone, played, Promise.all(loads)])
      Promise.race([ready, new Promise((r) => setTimeout(r, MAX_WAIT_MS))]).then(() => {
        gsap.timeline({ onComplete: () => { lockScroll(false); setDone(true) } })
          .to(q('.pl__inner'), { autoAlpha: 0, y: -24, duration: 0.5, ease: 'power2.in' })
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
        {rm ? (
          <img className="pl__video" src={VIDEO_POSTER} alt="Concord Pacific, Corp." />
        ) : (
          <video
            ref={video}
            className="pl__video"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            playsInline
            preload="auto"
            aria-label="Concord Pacific, Corp."
          />
        )}
        {!rm && (
          <div className="pl__foot">
            <span className="pl__count">000</span>
            <span className="pl__bar"><i /></span>
            <span>Exceptional Properties. Extraordinary Living.</span>
          </div>
        )}
      </div>
    </div>
  )
}
