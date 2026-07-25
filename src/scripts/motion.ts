import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP = '(min-width: 1024px)'
const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE_POINTER = '(pointer: fine)'

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

  // Wire Lenis → ScrollTrigger (Feature 4 dependency)
  lenis.on('scroll', ScrollTrigger.update)

  // Sync GSAP ticker with Lenis
  gsap.ticker.add((time) => {
    lenis!.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // --- Feature 2: Scroll-triggered reveals ---
  initReveals()

  // --- Feature 3: Portage drift ---
  initDrift()

  // --- Feature 4: Parallax template lane cards ---
  initParallax()

  // --- Feature 5: Cursor hover reveal ---
  initHoverReveal()

  // Store cleanup
  cleanup.push(() => {
    lenis?.destroy()
    lenis = null
    ScrollTrigger.getAll().forEach((st) => st.kill())
    gsap.ticker.remove((lenis as any)?.raf)
  })
}

function initReveals() {
  const fx = document.querySelectorAll<HTMLElement>('.fx')
  if (!fx.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          // Stagger: set delay from sibling index
          const parent = el.parentElement
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.fx'))
            const idx = siblings.indexOf(el)
            el.style.transitionDelay = `${idx * 60}ms`
          }
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15 }
  )

  fx.forEach((el) => observer.observe(el))

  cleanup.push(() => {
    observer.disconnect()
  })
}

function initDrift() {
  const driftRows = document.querySelectorAll<HTMLElement>('[data-drift-direction]')
  if (!driftRows.length) return

  let rafId: number | null = null

  const onScroll = () => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      driftRows.forEach((row) => {
        const rect = row.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (!inView) return

        const dir = row.dataset.driftDirection === 'left' ? -1 : 1
        const rowWidth = row.offsetWidth
        const maxTravel = rowWidth * 0.15 // 15% cap

        // Progress: 0 when entering viewport, 1 when leaving
        const progress = 1 - (rect.top / window.innerHeight)
        const clamped = Math.max(0, Math.min(1, progress))
        const offset = (clamped - 0.5) * 2 * maxTravel * dir

        row.style.transform = `translateX(${offset}px)`
      })
      rafId = null
    })
  }

  lenis?.on('scroll', onScroll)

  cleanup.push(() => {
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.off('scroll', onScroll)
    driftRows.forEach((row) => {
      row.style.transform = ''
    })
  })
}

// --- Feature 4: Parallax template lane cards ---
function initParallax() {
  const cards = document.querySelectorAll<HTMLElement>('.bento-tile[data-speed]')
  if (!cards.length) return

  cards.forEach((card) => {
    const speed = parseFloat(card.dataset.speed || '0')
    const maxTravel = 60 // Cap at ±60px per spec

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

// --- Feature 5: Cursor hover reveal ---
function initHoverReveal() {
  if (!window.matchMedia(FINE_POINTER).matches) return

  const cards = document.querySelectorAll<HTMLElement>('.bento-tile[data-preview-img]')
  if (!cards.length) return

  let preview: HTMLDivElement | null = null
  let quickToX: ((v: number) => void) | null = null
  let quickToY: ((v: number) => void) | null = null

  function createPreview() {
    preview = document.createElement('div')
    preview.className = 'hover-preview'
    preview.setAttribute('aria-hidden', 'true')
    preview.style.cssText = `
      position: fixed; top: 0; left: 0; width: 480px; height: auto;
      pointer-events: none; z-index: 50; opacity: 0;
      border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      will-change: transform, opacity;
    `
    document.body.appendChild(preview)

    quickToX = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' })
    quickToY = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' })
  }

  function showPreview(imgSrc: string, e: MouseEvent) {
    if (!preview) createPreview()
    if (!preview || !quickToX || !quickToY) return

    preview.querySelector('img')?.remove()
    const img = document.createElement('img')
    img.src = imgSrc
    img.loading = 'lazy'
    img.style.cssText = 'width: 100%; height: auto; display: block; border-radius: 12px;'
    preview.appendChild(img)

    quickToX(e.clientX + 20)
    quickToY(e.clientY + 20)

    gsap.to(preview, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  function hidePreview() {
    if (!preview) return
    gsap.to(preview, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        preview?.querySelector('img')?.remove()
      },
    })
  }

  cards.forEach((card) => {
    const imgSrc = card.dataset.previewImg
    if (!imgSrc) return

    card.addEventListener('mouseenter', (e) => {
      showPreview(imgSrc, e)
    })

    card.addEventListener('mousemove', (e) => {
      if (quickToX && quickToY) {
        quickToX(e.clientX + 20)
        quickToY(e.clientY + 20)
      }
    })

    card.addEventListener('mouseleave', () => {
      hidePreview()
    })

    // Keyboard: show on focus, hide on blur
    card.addEventListener('focusin', (e) => {
      const rect = card.getBoundingClientRect()
      showPreview(imgSrc, {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top,
      } as MouseEvent)
    })

    card.addEventListener('focusout', () => {
      hidePreview()
    })
  })

  cleanup.push(() => {
    if (preview) {
      preview.remove()
      preview = null
    }
  })
}

// --- G7: Cleanup on navigation ---
function destroy() {
  cleanup.forEach((fn) => fn())
  cleanup = []
}

// Astro View Transitions support
if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-swap', destroy)
  // Standard page unload
  window.addEventListener('beforeunload', destroy)
}

// Init
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}
