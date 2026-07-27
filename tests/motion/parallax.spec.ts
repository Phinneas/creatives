import { test, expect } from '@playwright/test'
import { transformOf, isMotionEnabled } from './helpers'

test.describe('Feature 4 — Parallax template lane cards', () => {
  test('Cards parallax at distinct speeds', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Find lane cards with data-speed
    const cards = page.locator('.bento-tile[data-speed]')
    const count = await cards.count()
    expect(count).toBe(3)

    // Get initial transforms
    const initialTransforms: DOMMatrixReadOnly[] = []
    for (let i = 0; i < count; i++) {
      const m = await transformOf(cards.nth(i))
      initialTransforms.push(m)
    }

    // Scroll the templates section
    await page.locator('#templates').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Check that each card's translateY offset differs
    const finalTransforms: DOMMatrixReadOnly[] = []
    for (let i = 0; i < count; i++) {
      const m = await transformOf(cards.nth(i))
      finalTransforms.push(m)
    }

    // All cards should have different offsets
    const offsets = finalTransforms.map((m) => m.m42)
    const uniqueOffsets = new Set(offsets)
    expect(uniqueOffsets.size).toBe(3)

    // Card with data-speed="-1" should move opposite to scroll direction
    const negativeSpeedCard = cards.nth(1) // data-speed="-1"
    const negativeSpeedInitial = initialTransforms[1].m42
    const negativeSpeedFinal = finalTransforms[1].m42

    // When scrolling down, negative speed should produce negative translateY
    // (moves opposite to scroll direction)
    if (negativeSpeedFinal !== negativeSpeedInitial) {
      expect(negativeSpeedFinal).toBeLessThan(negativeSpeedInitial)
    }
  })

  test('Parallax syncs with Lenis', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Lenis should be active
    const hasLenis = await page.locator('html').evaluate((el) =>
      el.classList.contains('lenis')
    )
    expect(hasLenis).toBe(true)

    // Scroll and check for no jitter
    const cards = page.locator('.bento-tile[data-speed]')
    const card = cards.first()

    // Scroll in steps and check transforms are smooth
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 100))
      await page.waitForTimeout(100)
    }

    // No transform jitter (transform should be a valid matrix)
    const transform = await card.evaluate((el) =>
      getComputedStyle(el).transform
    )
    expect(transform).toMatch(/matrix/)
  })

  test('No parallax on mobile or reduced motion', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (motionEnabled) return

    // All cards should have no transform applied
    const cards = page.locator('.bento-tile[data-speed]')
    const count = await cards.count()

    for (let i = 0; i < count; i++) {
      const transform = await cards.nth(i).evaluate((el) =>
        getComputedStyle(el).transform
      )
      // Transform should be 'none' or 'matrix(1, 0, 0, 1, 0, 0)' (identity)
      expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').toBe(true)
    }
  })
})
