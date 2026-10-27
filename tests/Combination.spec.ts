import { test, expect } from '@playwright/test';

test('Combination Pliers should be available', async ({ page }) => {
  // Open the application
  await page.goto('https://practicesoftwaretesting.com/');

  // Verify the product is visible
  const combinationPliers = page.getByText('Combination Pliers', {
    exact: true,
  });

  await expect(combinationPliers).toBeVisible();
});