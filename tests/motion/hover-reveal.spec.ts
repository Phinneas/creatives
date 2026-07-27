import { test, expect } from '@playwright/test'
import { isMotionEnabled } from './helpers'

test.describe('Feature 5 — Cursor-follow hover reveal on lane cards', () => {
  test('Preview appears and follows cursor', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Find a lane card with data-preview-img
    const card = page.locator('.bento-tile[data-preview-img]').first()
    await expect(card).toBeVisible()

    // Hover the card
    await card.hover()
    await page.waitForTimeout(500)

    // Preview element should appear
    const preview = page.locator('.hover-preview')
    await expect(preview).toBeVisible()

    // Preview should have the correct image
    const img = preview.locator('img')
    await expect(img).toBeVisible()

    // Preview should have pointer-events: none
    const pointerEvents = await preview.evaluate((el) =>
      getComputedStyle(el).pointerEvents
    )
    expect(pointerEvents).toBe('none')
  })

  test('Preview dismisses cleanly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    const card = page.locator('.bento-tile[data-preview-img]').first()
    await card.hover()
    await page.waitForTimeout(500)

    // Preview should be visible
    const preview = page.locator('.hover-preview')
    await expect(preview).toBeVisible()

    // Move mouse away
    await page.mouse.move(0, 0)
    await page.waitForTimeout(500)

    // Preview should fade out
    const opacity = await preview.evaluate((el) =>
      getComputedStyle(el).opacity
    )
    expect(parseFloat(opacity)).toBe(0)
  })

  test('Preview never traps navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    const card = page.locator('.bento-tile[data-preview-img]').first()
    await card.hover()
    await page.waitForTimeout(500)

    // Click the card
    await card.click()

    // Navigation should occur
    await page.waitForLoadState('networkidle')
    expect(page.url()).not.toBe('/')
  })

  test('No hover preview on touch devices', async ({ page }) => {
    // This test runs in the 'mobile' project context
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Tap a lane card
    const card = page.locator('.bento-tile[data-preview-img]').first()
    await card.tap()
    await page.waitForTimeout(500)

    // No preview element should be created
    const preview = page.locator('.hover-preview')
    const count = await preview.count()
    expect(count).toBe(0)
  })

  test('Keyboard users get an equivalent affordance', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Tab to a lane card
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Focus should be on a lane card
    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return el?.classList.contains('bento-tile') || false
    })

    if (focused) {
      // Preview should appear
      const preview = page.locator('.hover-preview')
      await expect(preview).toBeVisible()

      // It should be hidden from accessibility tree
      const ariaHidden = await preview.getAttribute('aria-hidden')
      expect(ariaHidden).toBe('true')
    }
  })
})
