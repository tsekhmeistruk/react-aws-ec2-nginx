const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const testData = require('../../data/data.json');

test.describe('LinkedIn Connection Feature', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('should display LinkedIn connection game section', async () => {
    const heading = await homePage.getLinkedInHeading();
    expect(heading).toBe(testData.linkedIn.heading);
    
    await expect(homePage.linkedInQuestion).toBeVisible();
  });

  test('should show connection result when check connection button is clicked', async () => {
    await homePage.clickCheckConnection();
    
    const result = await homePage.getConnectionResult();
    
    // The result should be either connected or not connected message
    const isValidResult = 
      result.includes(testData.linkedIn.notConnectedMessage) || 
      result.includes(testData.linkedIn.connectedMessage);
    
    expect(isValidResult).toBeTruthy();
  });

  test('should display not connected message most of the time', async () => {
    // Click multiple times to verify the random logic (0% chance in code)
    const results = [];
    
    for (let i = 0; i < 5; i++) {
      await homePage.clickCheckConnection();
      const result = await homePage.getConnectionResult();
      results.push(result);
    }
    
    // All results should show not connected (since Math.random() < 0.00)
    const allNotConnected = results.every(result => 
      result.includes(testData.linkedIn.notConnectedMessage)
    );
    
    expect(allNotConnected).toBeTruthy();
  });

  test('should have check connection button enabled and clickable', async () => {
    await expect(homePage.checkConnectionButton).toBeEnabled();
    await expect(homePage.checkConnectionButton).toBeVisible();
    
    // Verify button text
    const buttonText = await homePage.checkConnectionButton.textContent();
    expect(buttonText).toBe(testData.buttons.checkConnection);
  });
});
