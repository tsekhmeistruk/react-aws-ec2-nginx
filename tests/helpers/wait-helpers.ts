import { Page, Locator } from '@playwright/test';

/**
 * Custom wait helpers for handling dynamic content and async operations
 * Note: Use Playwright's built-in auto-waiting when possible. These helpers are for special cases.
 */
export class WaitHelpers {
  /**
   * Wait for an element to contain specific text
   * @param locator - The element locator
   * @param expectedText - The expected text content
   * @param timeout - Maximum time to wait in milliseconds
   * @example
   * await WaitHelpers.waitForTextToContain(
   *   page.locator('#result'),
   *   'connected with me on LinkedIn',
   *   5000
   * );
   */
  static async waitForTextToContain(
    locator: Locator,
    expectedText: string,
    timeout: number = 10000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    let currentText = '';
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      currentText = (await locator.textContent()) || '';
      if (currentText.includes(expectedText)) {
        return;
      }
      await locator.page().waitForTimeout(100);
    }

    throw new Error(
      `Text "${expectedText}" not found in element. Current text: "${currentText}"`
    );
  }

  /**
   * Wait for an element's text to change from initial value
   * Useful for dynamic content updates
   * @param locator - The element locator
   * @param timeout - Maximum time to wait in milliseconds
   * @example
   * const initialText = await page.locator('#result').textContent();
   * await page.click('button');
   * await WaitHelpers.waitForTextToChange(page.locator('#result'), 5000);
   */
  static async waitForTextToChange(locator: Locator, timeout: number = 10000): Promise<void> {
    const initialText = (await locator.textContent()) || '';
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentText = (await locator.textContent()) || '';
      if (currentText !== initialText && currentText.length > 0) {
        return;
      }
      await locator.page().waitForTimeout(100);
    }

    throw new Error(`Element text did not change from "${initialText}" within ${timeout}ms`);
  }

  /**
   * Wait for a new page/tab to open
   * @param page - The current page object
   * @param action - The action that triggers the new page
   * @param timeout - Maximum time to wait in milliseconds
   * @returns The new page object
   * @example
   * const newPage = await WaitHelpers.waitForNewPage(
   *   page,
   *   async () => await page.click('button', { hasText: 'Github Repo' }),
   *   10000
   * );
   */
  static async waitForNewPage(
    page: Page,
    action: () => Promise<void>,
    timeout: number = 10000
  ): Promise<Page> {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout }),
      action(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  /**
   * Wait for an element to be removed from DOM
   * @param locator - The element locator
   * @param timeout - Maximum time to wait in milliseconds
   * @example
   * await WaitHelpers.waitForElementToBeRemoved(
   *   page.locator('.loading-spinner'),
   *   5000
   * );
   */
  static async waitForElementToBeRemoved(
    locator: Locator,
    timeout: number = 10000
  ): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout });
  }

  /**
   * Wait for an element's attribute to have a specific value
   * @param locator - The element locator
   * @param attribute - The attribute name
   * @param expectedValue - The expected attribute value
   * @param timeout - Maximum time to wait in milliseconds
   * @example
   * await WaitHelpers.waitForAttributeValue(
   *   page.locator('iframe'),
   *   'src',
   *   'https://www.youtube.com/embed/Xn3Xj9Trepc',
   *   5000
   * );
   */
  static async waitForAttributeValue(
    locator: Locator,
    attribute: string,
    expectedValue: string,
    timeout: number = 10000
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.getAttribute(attribute);
      if (currentValue === expectedValue) {
        return;
      }
      await locator.page().waitForTimeout(100);
    }

    const finalValue = await locator.getAttribute(attribute);
    throw new Error(
      `Attribute "${attribute}" did not have value "${expectedValue}". Current value: "${finalValue}"`
    );
  }

  /**
   * Wait for multiple elements to be visible
   * @param locators - Array of element locators
   * @param timeout - Maximum time to wait in milliseconds
   * @example
   * await WaitHelpers.waitForMultipleElements([
   *   page.locator('header'),
   *   page.locator('footer'),
   *   page.locator('main')
   * ], 10000);
   */
  static async waitForMultipleElements(
    locators: Locator[],
    timeout: number = 10000
  ): Promise<void> {
    const promises = locators.map((locator) => locator.waitFor({ state: 'visible', timeout }));
    await Promise.all(promises);
  }
}
