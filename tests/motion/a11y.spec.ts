import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { isMotionEnabled, isReduced } from './helpers'

test.describe('Feature 6 — Global accessibility and fallback behavior', () => {
  test('Full reduced-motion pass', async ({ page }) => {
    test.skip(!(await isReduced(page)), 'requires reduced motion')
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasLenis = await page.locator('html').evaluate((el) => el.classList.contains('lenis'))
    expect(hasLenis).toBe(false)

    const reveals = page.locator('.reveal')
    const count = await reveals.count()

    for (let i = 0; i < count; i++) {
      const opacity = await reveals.nth(i).evaluate((el) => getComputedStyle(el).opacity)
      expect(parseFloat(opacity)).toBe(1)
    }

    const scrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    )
    expect(scrollBehavior).toBe('auto')
  })

  test('No-JS pass', async ({ page }) => {
    await page.route('**/*', (route) => {
      if (route.request().url().endsWith('.js')) {
        route.abort()
      } else {
        route.continue()
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const links = page.locator('a')
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)

    await expect(page.locator('.hero')).toBeVisible()
    await expect(page.locator('#lanes')).toBeVisible()
    await expect(page.locator('#portage')).toBeVisible()
  })

  test('Motion does not break focus visibility', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')

      const hasOutline = await page.evaluate(() => {
        const el = document.activeElement
        if (!el) return false
        const style = getComputedStyle(el)
        return (
          style.outlineStyle !== 'none' ||
          style.outlineWidth !== '0px' ||
          el.matches(':focus-visible')
        )
      })

      if (i > 2) {
        expect(hasOutline).toBe(true)
      }
    }

    const cards = page.locator('.lane[data-speed]')
    const card = cards.first()
    await card.focus()

    const outlineVisible = await card.evaluate((el) => {
      el.focus()
      const style = getComputedStyle(el)
      return style.outlineStyle !== 'none' || el.matches(':focus-visible')
    })
    expect(outlineVisible).toBe(true)
  })

  test('axe-core: zero violations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
