import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/motion',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4322',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview -- --port 4322',
    port: 4322,
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'desktop-motion',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'desktop-reduced',
      use: {
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      },
    },
    {
      name: 'mobile',
      use: {
        viewport: { width: 390, height: 844 },
        hasTouch: true,
      },
    },
  ],
})
