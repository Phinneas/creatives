import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP = '(min-width: 1024px)'
const REDUCED = '(prefers-reduced-motion: reduce)'

let lenis: Lenis | null = null
let cleanup: (() => void)[] = []

function init() {
  // Gate: desktop AND motion allowed
  if (!window.matchMedia(DESKTOP).matches) return
  if (window.matchMedia(REDUCED).matches) return

  // --- Feature 1: Lenis smooth scroll ---
  lenis = new Lenis({
    lerp: 0.7,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  // Wire Lenis → ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis!.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // --- Feature 4: Parallax lane cards ---
  initParallax()

  cleanup.push(() => {
    lenis?.destroy()
    lenis = null
    ScrollTrigger.getAll().forEach((st) => st.kill())
  })
}

function initParallax() {
  const cards = document.querySelectorAll<HTMLElement>('.lane[data-speed]')
  if (!cards.length) return

  cards.forEach((card) => {
    const speed = parseFloat(card.dataset.speed || '0')
    const maxTravel = 60 // Cap at ±60px

    gsap.fromTo(
      card,
      { y: 0 },
      {
        y: () => Math.max(-maxTravel, Math.min(maxTravel, speed * 10)),
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    )

    // Add will-change class during active scroll only
    ScrollTrigger.create({
      trigger: card,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => card.classList.add('parallax-active'),
      onLeave: () => card.classList.remove('parallax-active'),
      onEnterBack: () => card.classList.add('parallax-active'),
      onLeaveBack: () => card.classList.remove('parallax-active'),
    })
  })

  cleanup.push(() => {
    cards.forEach((card) => {
      card.classList.remove('parallax-active')
      card.style.transform = ''
    })
  })
}

// Cleanup on navigation
function destroy() {
  cleanup.forEach((fn) => fn())
  cleanup = []
}

// Astro View Transitions support
if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-swap', destroy)
  window.addEventListener('beforeunload', destroy)
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}
