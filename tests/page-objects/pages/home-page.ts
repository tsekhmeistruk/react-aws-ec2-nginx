import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';

/**
 * HomePage class represents the main landing page of CodeWithMuh application
 * Contains all locators and methods for interacting with the home page
 */
export class HomePage extends BasePage {
  // Header elements
  readonly header: Locator;
  readonly headerTitle: Locator;

  // Main content elements
  readonly reactLogo: Locator;
  readonly youtubeIframe: Locator;
  readonly videoDescription: Locator;

  // LinkedIn Connection Game section
  readonly linkedInGameTitle: Locator;
  readonly linkedInGameDescription: Locator;
  readonly checkConnectionButton: Locator;
  readonly connectionResult: Locator;

  // Action buttons
  readonly subscribeButton: Locator;
  readonly githubRepoButton: Locator;

  // Footer elements
  readonly footer: Locator;
  readonly footerCopyright: Locator;

  constructor(page: Page) {
    super(page);

    // Header locators
    this.header = page.locator('header');
    this.headerTitle = page.locator('header h1');

    // Main content locators
    this.reactLogo = page.locator('img.App-logo');
    this.youtubeIframe = page.locator('iframe[src*="youtube.com/embed"]');
    this.videoDescription = page.locator('main p').first();

    // LinkedIn Connection Game locators
    this.linkedInGameTitle = page.locator('h2', { hasText: 'LinkedIn Connection Game' });
    this.linkedInGameDescription = page.locator('p', {
      hasText: 'Are you connected with me on LinkedIn?',
    });
    this.checkConnectionButton = page.locator('button', { hasText: 'Check Connection' });
    this.connectionResult = page.locator('#result');

    // Action buttons locators
    this.subscribeButton = page.locator('button', { hasText: 'Subscribe to my channel' });
    this.githubRepoButton = page.locator('button', { hasText: 'Github Repo' });

    // Footer locators
    this.footer = page.locator('footer');
    this.footerCopyright = page.locator('footer p');
  }

  /**
   * Navigate to the home page
   * @example
   * await homePage.navigateToHome();
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Get the header title text
   * @returns The header title text
   */
  async getHeaderTitle(): Promise<string> {
    return await this.headerTitle.textContent() || '';
  }

  /**
   * Check if the React logo is visible and animated
   * @returns True if logo is visible
   */
  async isReactLogoVisible(): Promise<boolean> {
    return await this.reactLogo.isVisible();
  }

  /**
   * Check if the YouTube video iframe is embedded
   * @returns True if iframe is visible
   */
  async isYouTubeVideoEmbedded(): Promise<boolean> {
    return await this.youtubeIframe.isVisible();
  }

  /**
   * Get the YouTube video URL from the iframe
   * @returns The video URL
   */
  async getYouTubeVideoURL(): Promise<string> {
    return (await this.youtubeIframe.getAttribute('src')) || '';
  }

  /**
   * Click the "Check Connection" button for LinkedIn game
   * @example
   * await homePage.clickCheckConnection();
   */
  async clickCheckConnection(): Promise<void> {
    await this.checkConnectionButton.click();
    // Wait for result to appear
    await this.connectionResult.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Get the connection result message
   * @returns The result message text
   */
  async getConnectionResult(): Promise<string> {
    return await this.connectionResult.textContent() || '';
  }

  /**
   * Get the connection result HTML (includes links)
   * @returns The result HTML content
   */
  async getConnectionResultHTML(): Promise<string> {
    return (await this.connectionResult.innerHTML()) || '';
  }

  /**
   * Click the "Subscribe to my channel" button
   * Opens YouTube subscription page in new tab
   * @example
   * const newPage = await homePage.clickSubscribeButton();
   */
  async clickSubscribeButton(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.subscribeButton.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  /**
   * Click the "Github Repo" button
   * Opens GitHub repository in new tab
   * @example
   * const newPage = await homePage.clickGithubRepoButton();
   */
  async clickGithubRepoButton(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.githubRepoButton.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  /**
   * Get the footer copyright text
   * @returns The copyright text
   */
  async getFooterCopyright(): Promise<string> {
    return await this.footerCopyright.textContent() || '';
  }

  /**
   * Check if all main page elements are visible
   * @returns True if all elements are visible
   */
  async areAllMainElementsVisible(): Promise<boolean> {
    const elements = [
      this.header,
      this.reactLogo,
      this.youtubeIframe,
      this.checkConnectionButton,
      this.subscribeButton,
      this.githubRepoButton,
      this.footer,
    ];

    for (const element of elements) {
      if (!(await element.isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get all button texts on the page
   * @returns Array of button texts
   */
  async getAllButtonTexts(): Promise<string[]> {
    const buttons = await this.page.locator('button').all();
    const texts: string[] = [];
    for (const button of buttons) {
      const text = await button.textContent();
      if (text) texts.push(text);
    }
    return texts;
  }
}
