import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, SplitText, reduceMotion } from './gsap'

/**
 * Scans a container for declarative animation attributes:
 *  data-split          -> masked line reveal on scroll
 *  data-fade           -> fade up on scroll (value = delay)
 *  data-stagger        -> children fade up in sequence
 *  data-img            -> architectural clip reveal + inner zoom
 *  data-parallax="n"   -> inner image drifts on scroll (n = strength)
 *  data-words          -> words brighten as you scroll
 *  data-line           -> hairline draws in
 */
export default function useReveal(scope, extra, deps = []) {
  useLayoutEffect(() => {
    if (!scope.current) return
    scope.current.setAttribute('data-scope', '')
    const splits = []
    let ctx
    let cancelled = false
    const run = () => {
      if (cancelled || !scope.current) return
      ctx = gsap.context(() => {
        const all = gsap.utils.selector(scope)
        const own = (sel) => all(sel).filter((el) => el.parentElement.closest('[data-scope]') === scope.current || el === scope.current)
        const q = (sel) => own(sel)
        const rm = reduceMotion()

        q('[data-split]').forEach((el) => {
          const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'sl' })
          splits.push(s)
          if (rm) return
          gsap.from(s.lines, {
            yPercent: 110, duration: 1.3, stagger: 0.09, ease: 'expo.out',
            delay: parseFloat(el.dataset.split) || 0,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })

        q('[data-words]').forEach((el) => {
          const s = SplitText.create(el, { type: 'words', wordsClass: 'sw' })
          splits.push(s)
          if (rm) return
          gsap.fromTo(s.words, { opacity: 0.14 }, {
            opacity: 1, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
          })
        })

        if (!rm) {
          q('[data-fade]').forEach((el) => {
            gsap.from(el, {
              y: 40, autoAlpha: 0, duration: 1.2, delay: parseFloat(el.dataset.fade) || 0,
              scrollTrigger: { trigger: el, start: 'top 90%' },
            })
          })
          q('[data-stagger]').forEach((el) => {
            gsap.from(el.children, {
              y: 36, autoAlpha: 0, duration: 1.1, stagger: 0.08,
              scrollTrigger: { trigger: el, start: 'top 88%' },
            })
          })
          q('[data-img]').forEach((el) => {
            const img = el.querySelector('img')
            const dir = el.dataset.img || 'up'
            const from = { up: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)', center: 'inset(50% 50% 50% 50%)' }[dir]
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } })
            tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' })
            if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.2)
          })
          q('[data-parallax]').forEach((el) => {
            const amt = parseFloat(el.dataset.parallax) || 12
            const target = el.querySelector('img') || el
            gsap.fromTo(target, { yPercent: -amt }, {
              yPercent: amt, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            })
          })
          q('[data-line]').forEach((el) => {
            gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } })
          })
        }
        extra && extra(all, rm)
      }, scope)
      requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh() })
    }
    ;(document.fonts?.ready || Promise.resolve()).then(run)
    return () => {
      cancelled = true
      ctx && ctx.revert()
      splits.forEach((s) => s.revert())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
