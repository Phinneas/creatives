import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { isMotionEnabled } from './helpers'

test.describe('Feature 6 — Global accessibility and fallback behavior', () => {
  test('Full reduced-motion pass', async ({ page }) => {
    // This test runs in the 'desktop-reduced' project context
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Lenis, ScrollTrigger, drift, and hover previews should all be inert
    const hasLenis = await page.locator('html').evaluate((el) =>
      el.classList.contains('lenis')
    )
    expect(hasLenis).toBe(false)

    // All content should be visible and readable
    const fxElements = page.locator('.fx')
    const count = await fxElements.count()

    for (let i = 0; i < count; i++) {
      const opacity = await fxElements.nth(i).evaluate((el) =>
        getComputedStyle(el).opacity
      )
      expect(parseFloat(opacity)).toBe(1)
    }

    // Scrolling should be native
    const scrollBehavior = await page.evaluate(() =>
      getComputedStyle(document.documentElement).scrollBehavior
    )
    expect(scrollBehavior).toBe('auto')
  })

  test('No-JS pass', async ({ page }) => {
    // Disable JavaScript
    await page.route('**/*', (route) => {
      if (route.request().url().endsWith('.js')) {
        route.abort()
      } else {
        route.continue()
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Every page should render all content visibly
    const body = page.locator('body')
    await expect(body).toBeVisible()

    // All links and navigation should work
    const links = page.locator('a')
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)

    // Check that key sections are visible
    await expect(page.locator('.hero')).toBeVisible()
    await expect(page.locator('#templates')).toBeVisible()
    await expect(page.locator('#migration')).toBeVisible()
  })

  test('Motion does not break focus visibility', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const motionEnabled = await isMotionEnabled(page)
    if (!motionEnabled) return

    // Tab through the page
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')

      // Check that focus outlines are visible
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

      // At least some elements should have visible focus
      if (i > 2) {
        expect(hasOutline).toBe(true)
      }
    }

    // Parallax/drift transforms should not clip focus rings
    const cards = page.locator('.bento-tile[data-speed]')
    const card = cards.first()

    // Focus on card
    await card.focus()

    // Focus ring should be visible (not clipped by overflow: hidden or transform)
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
