// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium-dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
      },
      testMatch: /.*\.spec\.js/,
    },
    {
      name: 'firefox-dev',
      use: { 
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
      },
      testMatch: /.*\.spec\.js/,
    },
    {
      name: 'webkit-dev',
      use: { 
        ...devices['Desktop Safari'],
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
      },
      testMatch: /.*\.spec\.js/,
    },

    // Staging environment projects
    {
      name: 'chromium-staging',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.STAGING_URL || 'https://staging.example.com',
      },
      testMatch: /.*\.spec\.js/,
    },
    {
      name: 'firefox-staging',
      use: { 
        ...devices['Desktop Firefox'],
        baseURL: process.env.STAGING_URL || 'https://staging.example.com',
      },
      testMatch: /.*\.spec\.js/,
    },
    {
      name: 'webkit-staging',
      use: { 
        ...devices['Desktop Safari'],
        baseURL: process.env.STAGING_URL || 'https://staging.example.com',
      },
      testMatch: /.*\.spec\.js/,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.CI ? undefined : {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
