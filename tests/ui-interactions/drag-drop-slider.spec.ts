import { test, expect } from '@playwright/test';

test('Drag & Drop slider can be moved from 15 to 95', async ({ page }) => {
  // 1. Open LambdaTest’s demo playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // Click “Drag & Drop Sliders”
  await page.click('text=Drag & Drop Sliders');

  // 2. Select the slider “Default value 15” and drag the bar to make it 95
  const slider = await page.locator('input[value="15"]');
  const sliderBoundingBox = await slider.boundingBox();
  if (sliderBoundingBox) {
    await page.mouse.move(
      sliderBoundingBox.x + sliderBoundingBox.width / 4,
      sliderBoundingBox.y + sliderBoundingBox.height / 4
    );
    await page.mouse.down();
    await page.mouse.move(
      sliderBoundingBox.x + (sliderBoundingBox.width * 95) / 100,
      sliderBoundingBox.y + sliderBoundingBox.height / 2
    );
    await page.mouse.up();
  }

  // validating whether the range value shows 95
  const rangeValue = await page.textContent('#rangeSuccess');
  expect(rangeValue).toContain('95');
});
