import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Staging environment configuration
 * Extends base configuration with staging-specific settings
 */
export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    /* Staging environment base URL */
    baseURL: process.env.STAGING_URL || 'https://staging.codewithmuh.com',
  },
  /* Disable local dev server for staging */
  webServer: undefined,
});
