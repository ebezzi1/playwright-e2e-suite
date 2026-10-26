import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';

test.describe('Add to cart functionality', () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
  });

  test('should allow a user to add a product to the cart', async ({ page }) => {
    await homePage.goto();
    await homePage.search('iPhone');

    // Get the first product card
    const firstProduct = page.locator('.product-layout').first();
    await expect(firstProduct).toBeVisible();

    // Narrow down to the button inside the first product only
    const addToCartButton = firstProduct.locator('button.btn-cart');
    await addToCartButton.click({force: true});
    
    // CRITICAL: Set up notification listener BEFORE clicking
    const toast = page.locator('#notification-box-top .toast.show');
    
    // Use Promise.all to wait for both click and notification simultaneously
    await Promise.all([
      // Wait for the notification to appear
      expect(toast).toBeVisible({ timeout: 3000 }),
      // Click the button
      addToCartButton.click()
    ]);
    
    // Quickly verify the notification content (it disappears in 1-2 seconds)
    await expect(toast).toContainText('Success: You have added', { timeout: 1000 });
    
    // Optional: Log success for debugging
    const notificationText = await toast.textContent().catch(() => 'notification disappeared');
    console.log('Captured notification:', notificationText);

  });
});
