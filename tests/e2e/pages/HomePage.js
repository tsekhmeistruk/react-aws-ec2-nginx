const testData = require('../../data/data.json');

class HomePage {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.logo = page.locator(testData.selectors.logo);
    this.header = page.locator(testData.selectors.header);
    this.videoIframe = page.locator(testData.selectors.videoIframe);
    this.videoDescription = page.locator('main p').first();
    this.linkedInHeading = page.locator(testData.selectors.linkedInHeading);
    this.linkedInQuestion = page.locator('main p').nth(1);
    this.checkConnectionButton = page.getByRole('button', { name: testData.buttons.checkConnection });
    this.subscribeButton = page.getByRole('button', { name: testData.buttons.subscribe });
    this.githubRepoButton = page.getByRole('button', { name: testData.buttons.githubRepo });
    this.resultParagraph = page.locator(testData.selectors.resultParagraph);
    this.footer = page.locator(testData.selectors.footer);
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.header.waitFor({ state: 'visible' });
  }

  async getHeaderText() {
    return await this.header.textContent();
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }

  async isVideoEmbedVisible() {
    return await this.videoIframe.isVisible();
  }

  async getVideoDescription() {
    return await this.videoDescription.textContent();
  }

  async getLinkedInHeading() {
    return await this.linkedInHeading.textContent();
  }

  async clickCheckConnection() {
    await this.checkConnectionButton.click();
  }

  async getConnectionResult() {
    await this.page.waitForTimeout(100); // Small wait for result to appear
    return await this.resultParagraph.textContent();
  }

  async clickSubscribeButton() {
    // Listen for popup before clicking
    const popupPromise = this.page.waitForEvent('popup');
    await this.subscribeButton.click();
    return await popupPromise;
  }

  async clickGithubRepoButton() {
    // Listen for popup before clicking
    const popupPromise = this.page.waitForEvent('popup');
    await this.githubRepoButton.click();
    return await popupPromise;
  }

  async getFooterText() {
    return await this.footer.textContent();
  }

  async getAllButtonsCount() {
    const buttons = await this.page.locator('button').count();
    return buttons;
  }
}

module.exports = { HomePage };
