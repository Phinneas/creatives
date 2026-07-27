import { test, expect } from '@playwright/test'
import { isMotionEnabled } from './helpers'

test.describe('Feature 2 — Scroll-triggered section reveals', () => {
  test('Elements reveal on entering viewport', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)

    // Find a .fx element below the viewport
    const fxElements = page.locator('.fx')
    const count = await fxElements.count()
    expect(count).toBeGreaterThan(0)

    // Get the first .fx element
    const firstFx = fxElements.first()

    if (motionEnabled) {
      // Initially, the element should have opacity 0
      const initialOpacity = await firstFx.evaluate((el) =>
        getComputedStyle(el).opacity
      )
      expect(parseFloat(initialOpacity)).toBe(0)

      // Scroll until the element is visible
      await firstFx.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Element should now have .is-visible class
      await expect(firstFx).toHaveClass(/is-visible/)

      // Opacity should transition to 1
      const finalOpacity = await firstFx.evaluate((el) =>
        getComputedStyle(el).opacity
      )
      expect(parseFloat(finalOpacity)).toBe(1)
    } else {
      // With reduced motion, element should be visible immediately
      const opacity = await firstFx.evaluate((el) =>
        getComputedStyle(el).opacity
      )
      expect(parseFloat(opacity)).toBe(1)
    }
  })

  test('Reveals fire once and stay', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return // Skip for reduced motion

    const firstFx = page.locator('.fx').first()

    // Scroll to reveal
    await firstFx.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(firstFx).toHaveClass(/is-visible/)

    // Scroll away
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    // Scroll back - should still be visible
    await firstFx.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(firstFx).toHaveClass(/is-visible/)
  })

  test('Content is never hidden without motion', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Every .fx element should be fully visible
    const fxElements = page.locator('.fx')
    const count = await fxElements.count()

    for (let i = 0; i < count; i++) {
      const el = fxElements.nth(i)
      const opacity = await el.evaluate((el) =>
        getComputedStyle(el).opacity
      )
      expect(parseFloat(opacity)).toBe(1)
    }
  })
})
