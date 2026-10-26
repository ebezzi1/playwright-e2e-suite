import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("div[id='entry_217822'] input[placeholder='Search For Products']");
    this.searchButton = page.locator('button.type-text');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async search(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }
}
