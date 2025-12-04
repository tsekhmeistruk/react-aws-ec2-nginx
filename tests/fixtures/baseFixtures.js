/**
 * Base fixtures for Playwright tests
 * Provides common setup and utilities for all tests
 */

const { test as base } = require('@playwright/test');
const { HomePage } = require('../e2e/pages/HomePage');

/**
 * Extended test fixture with page objects and utilities
 */
const test = base.extend({
  /**
   * HomePage fixture - automatically creates HomePage instance
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Context with custom configuration
   */
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      permissions: [],
    });
    await use(context);
    await context.close();
  },
});

module.exports = { test };
