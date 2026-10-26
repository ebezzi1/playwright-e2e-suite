import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { faker } from '@faker-js/faker';

test.describe('Login functionality', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    telephone: faker.phone.number(),
    password: faker.internet.password(),
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test('should allow a registered user to log in', async ({ page }) => {
    await registerPage.goto();
    await registerPage.register(user);
    await page.goto('/index.php?route=account/logout');
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page).toHaveURL('index.php?route=account/account');
  });

  test('should show an error message for invalid credentials', async () => {
    await loginPage.goto();
    await loginPage.login(faker.internet.email(), faker.internet.password());
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Warning: No match for E-Mail Address and/or Password.');
  });
});
