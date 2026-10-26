import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly firstProductCard: Locator;
  readonly addToCartButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProductCard = page.locator('.product-layout').first();
    this.addToCartButton = this.firstProductCard.locator('button.btn-cart');
    this.toastMessage = page.locator('#notification-box-top .toast-body p');
  }

  async addFirstProductToCart() {
    await expect(this.firstProductCard).toBeVisible();
    await this.addToCartButton.click();
  }

  async assertProductAddedToCart() {
    await expect(this.toastMessage).toContainText('Success: You have added');
  }
}
