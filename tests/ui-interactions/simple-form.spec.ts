import { test, expect } from '@playwright/test';

test('Simple Form Demo displays the entered message', async ({ page }) => {
  // 1. Open LambdaTest’s demo playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // 2. Click “Simple Form Demo”
  await page.click('text=Simple Form Demo');

  // 3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/simple-form-demo/);

  // 4. Create a variable for a string value
  const message = 'Welcome to LambdaTest';

  // 5. Use this variable to enter values in the “Enter Message” text box
  // (#user-message is duplicated on the page, so target the input by its placeholder)
  await page.getByPlaceholder('Please enter your Message').fill(message);

  // 6 & 7. Click “Get Checked Value” and validate the same message is displayed in the right-hand panel.
  // The button's handler is attached after client-side navigation, so retry the click until it takes effect.
  const displayedMessage = page.locator('#message');
  await expect(async () => {
    await page.click('#showInput');
    await expect(displayedMessage).toHaveText(message, { timeout: 1000 });
  }).toPass();
});
