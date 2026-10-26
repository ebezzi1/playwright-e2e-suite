import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Search functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should show relevant results for a valid search', async ({ page }) => {
    await homePage.search('iPhone');
    await expect(page).toHaveURL('index.php?route=product%2Fsearch&search=iPhone');
    const products = page.locator('.product-layout');
    //Check that at least one product is visible
    await expect(products).not.toHaveCount(0);
    console.log(`Found ${await products.count()} products for 'iPhone' search.`);
  });

  test('should show a "no results" message for an invalid search', async ({ page }) => {
    await homePage.search('@@@@');
    await expect(page).toHaveURL('index.php?route=product%2Fsearch&search=%40%40%40%40');
    const noResultsMessage = page.locator('#entry_212469');
    await expect(noResultsMessage).toBeVisible();
    await expect(noResultsMessage).toContainText('There is no product that matches the search criteria.');
  });
});
