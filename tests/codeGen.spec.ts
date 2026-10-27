import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Combination Pliers header contain correct text', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByText('Combination Pliers').click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
  //await expect(page.getByTestId('product-name')).toContainText('Combination Pliers');
});

test('Claw Hammer header contain correct text', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByText('Claw Hammer', {exact: true}).click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Claw Hammer');
  //await expect(page.getByTestId('product-name')).toContainText('Claw Hammer');
});


test('Search for Thohr Hammer', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByPlaceholder('Search').fill('Hammer');
  await page.locator('[data-test="search-submit"]').click();
  await page.locator('[data-test="product-01M4V3AEEEFZBQXYXBV6S913Z6"]').click();
  await expect(page.locator('[data-test="product-name"]')).toContainText('Thor Hammer');
});



test('Out of stock', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('//*[@class="card-footer"]').getByText("Out of stock").click();
  await expect(page.locator('[data-test="out-of-stock"]')).toBeVisible();
});



