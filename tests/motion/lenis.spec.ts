import { test, expect } from '@playwright/test'
import { isLenisActive, isDesktop, isReduced } from './helpers'

test.describe('Feature 1 — Smooth inertial scrolling', () => {
  test('Lenis initializes on desktop with motion allowed', async ({ page }) => {
    test.skip(!(await isDesktop(page)) || (await isReduced(page)), 'requires desktop + motion allowed')
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(true)

    await expect(page.locator('html')).toHaveClass(/lenis/)
  })

  test('Anchor navigation still works', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.click('a[href="#lanes"]')
    await page.waitForTimeout(1000)

    expect(page.url()).toContain('#lanes')
  })

  test('Lenis does not initialize on mobile', async ({ page }) => {
    test.skip(await isDesktop(page), 'requires mobile viewport')
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(false)
  })

  test('Reduced motion disables Lenis', async ({ page }) => {
    test.skip(!(await isReduced(page)), 'requires reduced motion')
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await isLenisActive(page)
    expect(hasLenis).toBe(false)

    const scrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    )
    expect(scrollBehavior).toBe('auto')
  })
})
