import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(`${this.page.context().baseURL}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `${name}.png` });
  }
}