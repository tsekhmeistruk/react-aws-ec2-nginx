const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const testData = require('../../data/data.json');

test.describe('External Navigation Links', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should open YouTube channel in new tab when subscribe button is clicked', async ({ context }) => {
    const popup = await homePage.clickSubscribeButton();
    
    // Wait for the popup to load
    await popup.waitForLoadState();
    
    // Verify the URL contains YouTube
    const url = popup.url();
    expect(url).toContain('youtube.com');
    expect(url).toContain('@codewithmuh');
    
    await popup.close();
  });

  test('should open GitHub repository in new tab when github repo button is clicked', async ({ context }) => {
    const popup = await homePage.clickGithubRepoButton();
    
    // Wait for the popup to load
    await popup.waitForLoadState();
    
    // Verify the URL contains GitHub
    const url = popup.url();
    expect(url).toContain('github.com');
    expect(url).toContain('react-aws-ec2-nginx');
    
    await popup.close();
  });

  test('should have correct button labels for external links', async () => {
    const subscribeText = await homePage.subscribeButton.textContent();
    expect(subscribeText).toBe(testData.buttons.subscribe);
    
    const githubText = await homePage.githubRepoButton.textContent();
    expect(githubText).toBe(testData.buttons.githubRepo);
  });

  test('should keep main page open after clicking external links', async ({ page, context }) => {
    const initialPageCount = context.pages().length;
    
    // Click subscribe button
    const popup1 = await homePage.clickSubscribeButton();
    await popup1.waitForLoadState();
    
    // Verify new tab opened but original page still exists
    expect(context.pages().length).toBe(initialPageCount + 1);
    
    // Verify main page is still on the home URL
    expect(page.url()).toContain('/');
    
    await popup1.close();
  });
});
