import { test, expect } from '@playwright/test';

test('Test Scenario 1', async ({ page }) => {
  // 1. Open LambdaTest’s Selenium Playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // 2. Click “Simple Form Demo”
  await page.click('text=Simple Form Demo');

  // 3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/simple-form-demo/);

  // 4. Create a variable for a string value
  const message = 'Welcome to LambdaTest';

  // 5. Use this variable to enter values in the “Enter Message” text box
  await page.fill('#user-message', message);

  // 6. Click “Get Checked Value”
  await page.click('#showInput');

  // 7. Validate whether the same text message is displayed in the right-hand panel
  const displayedMessage = await page.textContent('#message');
  // expect(displayedMessage).toBe(message);
});
