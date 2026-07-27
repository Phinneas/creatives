import { type Locator, type Page } from '@playwright/test'

/**
 * Get the DOMMatrixReadOnly from an element's computed transform.
 * Use directional deltas instead of exact pixel values (Lenis lerp is timing-dependent).
 */
export async function transformOf(locator: Locator): Promise<DOMMatrixReadOnly> {
  return locator.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform))
}

/**
 * Check if Lenis is initialized (html has .lenis class)
 */
export async function isLenisActive(page: Page): Promise<boolean> {
  return page.locator('html').evaluate((el) => el.classList.contains('lenis'))
}

/**
 * Check if motion is enabled (desktop + no reduced motion)
 */
export async function isMotionEnabled(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return desktop && !reduced
  })
}
