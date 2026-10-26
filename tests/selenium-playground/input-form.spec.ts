import { test, expect } from '@playwright/test';

test('Input Form requires fields and shows success after submit', async ({ page }) => {
  // 1. Open the https://www.lambdatest.com/selenium-playground page
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // Click “Input Form Submit”
  await page.click('text=Input Form Submit');

  // 2. Click “Submit” without filling in any information
  await page.click('button:has-text("Submit")');

  // 3. Assert “Please fill in the fields” error message
  // The browser's native "Please fill in this field" bubble isn't in the DOM, so assert the validity state behind it
  const nameInput = page.locator('#name');
  expect(await nameInput.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  expect(await nameInput.evaluate((input: HTMLInputElement) => input.validationMessage)).not.toBe('');

  // 4. Fill in Name, Email, and other fields
  await page.fill('#name', 'John Doe');
  await page.fill('#inputEmail4', 'john.doe@example.com');
  await page.fill('#inputPassword4', 'password');
  await page.fill('#company', 'LambdaTest');
  await page.fill('#websitename', 'https://lambdatest.com');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('#inputCity', 'San Francisco');
  await page.fill('#inputAddress1', '123 Main St');
  await page.fill('#inputAddress2', 'Apt 4B');
  await page.fill('#inputState', 'California');
  await page.fill('#inputZip', '94105');

  // 5. Click “Submit”
  await page.click('button:has-text("Submit")');

  // 6. Validate the success message
  const successMessage = await page.textContent('.success-msg');
  expect(successMessage).toContain('Thanks for contacting us, we will get back to you shortly.');
});
