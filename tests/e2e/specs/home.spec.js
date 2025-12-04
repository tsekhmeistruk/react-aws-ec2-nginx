const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const testData = require('../../data/data.json');

test.describe('Home Page - Core Functionality', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should load the home page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(testData.app.title);
  });

  test('should display the main header with correct text', async () => {
    const headerText = await homePage.getHeaderText();
    expect(headerText).toContain('Welcome to');
    expect(headerText).toContain('CodeWithMuh');
  });

  test('should display the React logo with animation', async () => {
    const isVisible = await homePage.isLogoVisible();
    expect(isVisible).toBeTruthy();
    
    // Verify logo has the spinning animation class
    await expect(homePage.logo).toHaveClass(/App-logo/);
  });

  test('should display YouTube video embed', async () => {
    const isVideoVisible = await homePage.isVideoEmbedVisible();
    expect(isVideoVisible).toBeTruthy();
    
    // Verify iframe has correct YouTube source
    await expect(homePage.videoIframe).toHaveAttribute('src', /youtube\.com\/embed/);
  });

  test('should display video description text', async () => {
    const description = await homePage.getVideoDescription();
    expect(description).toContain('You are watching my latest video on');
    expect(description).toContain('AWS EC2');
  });

  test('should display all three action buttons', async () => {
    await expect(homePage.checkConnectionButton).toBeVisible();
    await expect(homePage.subscribeButton).toBeVisible();
    await expect(homePage.githubRepoButton).toBeVisible();
    
    const buttonCount = await homePage.getAllButtonsCount();
    expect(buttonCount).toBe(3);
  });

  test('should display footer with copyright text', async () => {
    const footerText = await homePage.getFooterText();
    expect(footerText).toContain('2024');
    expect(footerText).toContain('CodeWithMuh');
  });
});
