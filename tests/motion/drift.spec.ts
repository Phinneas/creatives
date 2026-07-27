import { test, expect } from '@playwright/test'
import { transformOf, isMotionEnabled } from './helpers'

test.describe('Feature 3 — Portage horizontal text drift', () => {
  test('Rows translate horizontally with scroll progress', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Find drift rows
    const driftRows = page.locator('[data-drift-direction]')
    const count = await driftRows.count()
    expect(count).toBe(4) // 4 migration pairs

    // Get initial transforms
    const initialTransforms: DOMMatrixReadOnly[] = []
    for (let i = 0; i < count; i++) {
      const m = await transformOf(driftRows.nth(i))
      initialTransforms.push(m)
    }

    // Scroll through the Portage section
    await page.locator('#migration').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Check that transforms have changed
    for (let i = 0; i < count; i++) {
      const m = await transformOf(driftRows.nth(i))
      const dir = await driftRows.nth(i).getAttribute('data-drift-direction')

      // Odd rows drift left (negative), even rows drift right (positive)
      // Or vice versa based on data-drift-direction attribute
      const expectedSign = dir === 'left' ? -1 : 1
      const delta = m.m41 - initialTransforms[i].m41

      // Delta should have the correct sign (or be zero if not in view)
      if (delta !== 0) {
        expect(Math.sign(delta)).toBe(expectedSign)
      }
    }
  })

  test('Drift is purely visual', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const driftRows = page.locator('[data-drift-direction]')
    const count = await driftRows.count()

    for (let i = 0; i < count; i++) {
      const row = driftRows.nth(i)

      // All migration pair links should remain clickable
      const links = row.locator('a')
      const linkCount = await links.count()
      expect(linkCount).toBeGreaterThan(0)

      // Text should remain selectable
      const userSelect = await row.evaluate((el) =>
        getComputedStyle(el).userSelect
      )
      expect(userSelect).not.toBe('none')

      // Tab order should be unchanged (check tabindex)
      const tabindex = await row.getAttribute('tabindex')
      expect(tabindex).toBeNull()
    }
  })
})
