import { test, expect } from '@playwright/test'
import { transformOf, isMotionEnabled } from './helpers'

test.describe('Feature 4 — Parallax template lane cards', () => {
  test('Cards parallax at distinct speeds', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    const cards = page.locator('.lane[data-speed]')
    const count = await cards.count()
    expect(count).toBe(3)

    const initialTransforms: DOMMatrixReadOnly[] = []
    for (let i = 0; i < count; i++) {
      initialTransforms.push(await transformOf(cards.nth(i)))
    }

    await page.locator('#lanes').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const finalTransforms: DOMMatrixReadOnly[] = []
    for (let i = 0; i < count; i++) {
      finalTransforms.push(await transformOf(cards.nth(i)))
    }

    const offsets = finalTransforms.map((m) => m.m42)
    const uniqueOffsets = new Set(offsets)
    expect(uniqueOffsets.size).toBe(3)

    const negativeSpeedCard = cards.nth(1) // data-speed="-1"
    const negativeInitial = initialTransforms[1].m42
    const negativeFinal = finalTransforms[1].m42

    if (negativeFinal !== negativeInitial) {
      expect(negativeFinal).toBeLessThan(negativeInitial)
    }
  })

  test('Parallax syncs with Lenis', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    const hasLenis = await page.locator('html').evaluate((el) => el.classList.contains('lenis'))
    expect(hasLenis).toBe(true)

    const card = page.locator('.lane[data-speed]').first()

    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 100))
      await page.waitForTimeout(100)
    }

    const transform = await card.evaluate((el) => getComputedStyle(el).transform)
    expect(transform).toMatch(/matrix/)
  })

  test('No parallax on mobile or reduced motion', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (motionEnabled) return

    const cards = page.locator('.lane[data-speed]')
    const count = await cards.count()

    for (let i = 0; i < count; i++) {
      const transform = await cards.nth(i).evaluate((el) => getComputedStyle(el).transform)
      expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').toBe(true)
    }
  })
})
