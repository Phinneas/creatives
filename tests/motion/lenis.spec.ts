import { test, expect } from '@playwright/test'
import { isLenisActive } from './helpers'

test.describe('Feature 1 — Smooth inertial scrolling', () => {
  test('Lenis initializes on desktop with motion allowed', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Lenis should be attached
    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(true)

    // html element carries .lenis class
    await expect(page.locator('html')).toHaveClass(/lenis/)
  })

  test('Anchor navigation still works', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click nav link to #templates
    await page.click('a[href="#templates"]')

    // Wait for smooth scroll
    await page.waitForTimeout(1000)

    // URL hash should update
    expect(page.url()).toContain('#templates')
  })

  test('Lenis does not initialize on mobile', async ({ page }) => {
    // Mobile context (390x844)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(false)
  })

  test('Reduced motion disables Lenis', async ({ page }) => {
    // This test runs in the 'desktop-reduced' project context
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(false)

    // Native browser scrolling should be used
    const scrollBehavior = await page.evaluate(() =>
      getComputedStyle(document.documentElement).scrollBehavior
    )
    expect(scrollBehavior).toBe('auto')
  })
})
