import { test, expect } from '@playwright/test'
import { isReduced } from './helpers'

test.describe('Feature 2 — Scroll-triggered section reveals', () => {
  test('Elements reveal on entering viewport', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const reduced = await isReduced(page)
    const reveals = page.locator('.reveal')
    const count = await reveals.count()
    expect(count).toBeGreaterThan(0)

    const target = reveals.nth(Math.min(4, count - 1))

    if (reduced) {
      // Reduced motion: content visible immediately
      const opacity = await target.evaluate((el) => getComputedStyle(el).opacity)
      expect(parseFloat(opacity)).toBe(1)
    } else {
      // Below-fold element should start at opacity 0, then reveal on scroll
      const initialOpacity = await target.evaluate((el) => getComputedStyle(el).opacity)
      expect(parseFloat(initialOpacity)).toBe(0)

      await target.scrollIntoViewIfNeeded()

      await expect(target).toHaveClass(/in/)
      await expect(target).toHaveCSS('opacity', '1')
    }
  })

  test('Reveals fire once and stay', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const target = page.locator('.reveal').nth(4)

    await target.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(target).toHaveClass(/in/)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    await target.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(target).toHaveClass(/in/)
  })

  test('Reduced motion shows all content immediately', async ({ page }) => {
    test.skip(!(await isReduced(page)), 'requires reduced motion')
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const reveals = page.locator('.reveal')
    const count = await reveals.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const opacity = await reveals.nth(i).evaluate((el) => getComputedStyle(el).opacity)
      expect(parseFloat(opacity)).toBe(1)
    }
  })
})
