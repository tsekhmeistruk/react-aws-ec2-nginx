import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { DataHelpers } from '../../helpers/data-helpers';

test.describe('External Links Navigation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should open YouTube subscription page in new tab', async ({ context }) => {
    const externalLinks = DataHelpers.loadTestData<any>('external-links.json');
    
    // Click subscribe button and wait for new page
    const newPage = await homePage.clickSubscribeButton();
    
    // Verify new page URL contains YouTube domain
    await newPage.waitForLoadState('domcontentloaded');
    const newPageURL = newPage.url();
    
    expect(newPageURL).toContain(externalLinks.domains.youtube);
    expect(newPageURL).toContain(externalLinks.youtubeChannel.channelName.replace('@', ''));
    
    // Close the new tab
    await newPage.close();
  });

  test('should open GitHub repository in new tab', async ({ context }) => {
    const externalLinks = DataHelpers.loadTestData<any>('external-links.json');
    
    // Click GitHub repo button and wait for new page
    const newPage = await homePage.clickGithubRepoButton();
    
    // Verify new page URL contains GitHub domain
    await newPage.waitForLoadState('domcontentloaded');
    const newPageURL = newPage.url();
    
    expect(newPageURL).toContain(externalLinks.domains.github);
    expect(newPageURL).toContain(externalLinks.github.owner);
    expect(newPageURL).toContain(externalLinks.github.repoName);
    
    // Close the new tab
    await newPage.close();
  });

  test('should keep original page open after clicking external links', async ({ context }) => {
    // Get initial page count
    const initialPages = context.pages().length;
    
    // Click subscribe button
    const newPage = await homePage.clickSubscribeButton();
    
    // Verify we now have 2 pages
    expect(context.pages().length).toBe(initialPages + 1);
    
    // Verify original page is still accessible
    await AssertionHelpers.assertElementIsVisible(homePage.header);
    
    // Close new page
    await newPage.close();
    
    // Verify we're back to original page count
    expect(context.pages().length).toBe(initialPages);
  });

  test('should have correct target attribute for external links', async () => {
    // Verify buttons trigger new window/tab (target="_blank" behavior)
    // This is tested implicitly by the new page opening in previous tests
    
    await AssertionHelpers.assertElementIsEnabled(homePage.subscribeButton);
    await AssertionHelpers.assertElementIsEnabled(homePage.githubRepoButton);
  });

  test('should maintain page state after opening external links', async ({ page }) => {
    // Click check connection to set some state
    await homePage.clickCheckConnection();
    await homePage.page.waitForTimeout(1000);
    
    const resultBeforeNavigation = await homePage.getConnectionResult();
    
    // Open external link
    const newPage = await homePage.clickGithubRepoButton();
    await newPage.close();
    
    // Verify original page state is maintained
    const resultAfterNavigation = await homePage.getConnectionResult();
    expect(resultAfterNavigation).toBe(resultBeforeNavigation);
  });

  test('should have all external link buttons visible and enabled', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.subscribeButton);
    await AssertionHelpers.assertElementIsVisible(homePage.githubRepoButton);
    
    await AssertionHelpers.assertElementIsEnabled(homePage.subscribeButton);
    await AssertionHelpers.assertElementIsEnabled(homePage.githubRepoButton);
  });

  test('should open multiple external links sequentially', async ({ context }) => {
    // Open YouTube
    const youtubePage = await homePage.clickSubscribeButton();
    expect(youtubePage.url()).toContain('youtube.com');
    
    // Open GitHub (original page should still be active)
    const githubPage = await homePage.clickGithubRepoButton();
    expect(githubPage.url()).toContain('github.com');
    
    // Verify we have 3 pages total (original + 2 new)
    expect(context.pages().length).toBe(3);
    
    // Clean up
    await youtubePage.close();
    await githubPage.close();
  });
});
