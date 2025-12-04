import { Page, expect } from '@playwright/test';

/**
 * BasePage class provides common functionality for all page objects
 * Uses this.page.context().baseURL for navigation to support multiple environments
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path relative to baseURL
   * @param path - The path to navigate to (e.g., '/', '/about')
   * @example
   * await basePage.goto('/');
   */
  async goto(path: string = '/'): Promise<void> {
    const baseURL = this.page.context().baseURL || '';
    await this.page.goto(`${baseURL}${path}`);
  }

  /**
   * Wait for the page to be fully loaded
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Take a screenshot of the current page
   * @param name - Name of the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Get the current page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current page URL
   * @returns The page URL
   */
  async getURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for a specific element to be visible
   * @param selector - The selector to wait for
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Check if an element is visible
   * @param selector - The selector to check
   * @returns True if visible, false otherwise
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Wait for a specific amount of time
   * @param ms - Time to wait in milliseconds
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
