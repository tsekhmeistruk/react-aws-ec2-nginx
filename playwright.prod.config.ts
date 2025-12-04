import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Production environment configuration
 * Extends base configuration with production-specific settings
 */
export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    /* Production environment base URL */
    baseURL: process.env.PROD_URL || 'https://codewithmuh.com',
  },
  /* Disable local dev server for production */
  webServer: undefined,
  /* More retries for production to handle network issues */
  retries: 3,
});
