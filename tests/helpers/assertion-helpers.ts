import { expect, Locator, Page } from '@playwright/test';

/**
 * Custom assertion helpers for enhanced test readability and reusability
 */
export class AssertionHelpers {
  /**
   * Assert that an element contains specific text
   * @param locator - The element locator
   * @param expectedText - The expected text content
   * @example
   * await AssertionHelpers.assertElementContainsText(
   *   page.locator('h1'),
   *   'Welcome to CodeWithMuh'
   * );
   */
  static async assertElementContainsText(
    locator: Locator,
    expectedText: string
  ): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Assert that an element has exact text
   * @param locator - The element locator
   * @param expectedText - The exact expected text
   * @example
   * await AssertionHelpers.assertElementHasExactText(
   *   page.locator('button').first(),
   *   'Check Connection'
   * );
   */
  static async assertElementHasExactText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Assert that an element is visible on the page
   * @param locator - The element locator
   * @example
   * await AssertionHelpers.assertElementIsVisible(
   *   page.locator('img.App-logo')
   * );
   */
  static async assertElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert that an element is hidden/not visible
   * @param locator - The element locator
   * @example
   * await AssertionHelpers.assertElementIsHidden(
   *   page.locator('#error-message')
   * );
   */
  static async assertElementIsHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert that an element is enabled
   * @param locator - The element locator
   * @example
   * await AssertionHelpers.assertElementIsEnabled(
   *   page.locator('button', { hasText: 'Subscribe' })
   * );
   */
  static async assertElementIsEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert that an element has a specific attribute value
   * @param locator - The element locator
   * @param attribute - The attribute name
   * @param expectedValue - The expected attribute value
   * @example
   * await AssertionHelpers.assertElementHasAttribute(
   *   page.locator('iframe'),
   *   'src',
   *   'https://www.youtube.com/embed/Xn3Xj9Trepc'
   * );
   */
  static async assertElementHasAttribute(
    locator: Locator,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, expectedValue);
  }

  /**
   * Assert that an element's attribute contains a specific value
   * @param locator - The element locator
   * @param attribute - The attribute name
   * @param expectedValue - The expected partial value
   * @example
   * await AssertionHelpers.assertElementAttributeContains(
   *   page.locator('iframe'),
   *   'src',
   *   'youtube.com/embed'
   * );
   */
  static async assertElementAttributeContains(
    locator: Locator,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    const attributeValue = await locator.getAttribute(attribute);
    expect(attributeValue).toContain(expectedValue);
  }

  /**
   * Assert that the page URL contains a specific string
   * @param page - The page object
   * @param expectedUrlPart - The expected URL part
   * @example
   * await AssertionHelpers.assertURLContains(
   *   page,
   *   'localhost:3000'
   * );
   */
  static async assertURLContains(page: Page, expectedUrlPart: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(expectedUrlPart));
  }

  /**
   * Assert that the page title matches expected value
   * @param page - The page object
   * @param expectedTitle - The expected page title
   * @example
   * await AssertionHelpers.assertPageTitle(
   *   page,
   *   'Subscribe CodeWithMuh'
   * );
   */
  static async assertPageTitle(page: Page, expectedTitle: string): Promise<void> {
    await expect(page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert that an element count matches expected value
   * @param locator - The element locator
   * @param expectedCount - The expected count
   * @example
   * await AssertionHelpers.assertElementCount(
   *   page.locator('button'),
   *   3
   * );
   */
  static async assertElementCount(locator: Locator, expectedCount: number): Promise<void> {
    await expect(locator).toHaveCount(expectedCount);
  }

  /**
   * Assert that multiple elements are visible
   * @param locators - Array of element locators
   * @example
   * await AssertionHelpers.assertMultipleElementsVisible([
   *   page.locator('header'),
   *   page.locator('footer'),
   *   page.locator('main')
   * ]);
   */
  static async assertMultipleElementsVisible(locators: Locator[]): Promise<void> {
    for (const locator of locators) {
      await expect(locator).toBeVisible();
    }
  }

  /**
   * Assert that an element has a specific CSS class
   * @param locator - The element locator
   * @param className - The expected CSS class name
   * @example
   * await AssertionHelpers.assertElementHasClass(
   *   page.locator('img'),
   *   'App-logo'
   * );
   */
  static async assertElementHasClass(locator: Locator, className: string): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className));
  }
}
