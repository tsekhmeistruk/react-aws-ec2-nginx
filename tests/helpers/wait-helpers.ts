export const waitHelpers = {
  waitForSelector: async (page, selector) => {
    await page.waitForSelector(selector);
  },
  waitForTimeout: async (timeout) => {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  },
};