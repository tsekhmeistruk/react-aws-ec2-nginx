import { expect } from '@playwright/test';

export const customExpect = {
  toBeVisible: async (locator) => {
    await expect(locator).toBeVisible();
  },
  toHaveText: async (locator, text) => {
    await expect(locator).toHaveText(text);
  },
};