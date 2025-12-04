/**
 * Staging environment configuration
 */

module.exports = {
  environment: 'staging',
  baseURL: process.env.STAGING_URL || 'https://staging.example.com',
  timeout: 30000,
  retries: 3,
  workers: 4,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: false,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 5000,
  },
};
