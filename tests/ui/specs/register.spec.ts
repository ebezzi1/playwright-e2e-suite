import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { faker } from '@faker-js/faker';

test.describe('Registration functionality', () => {
  let registerPage: RegisterPage;
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    password: faker.internet.password(),
  };

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('should allow a new user to register', async ({ page }) => {
    await registerPage.register(user);
    await expect(page).toHaveURL('index.php?route=account/success');
  });

  test('should show an error message if the email is already registered', async ({ page }) => {
    await registerPage.register(user);
    await page.goto('/index.php?route=account/logout');
    await registerPage.goto();
    await registerPage.register(user);
    const errorMessage = page.locator('.alert-danger');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Warning: E-Mail Address is already registered!');
  });
});
