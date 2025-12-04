/**
 * Development environment configuration
 */

module.exports = {
  environment: 'dev',
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  timeout: 30000,
  retries: 3,
  workers: 4,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 5000,
  },
};
