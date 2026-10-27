import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Search for pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByLabel('Search').dblclick();
  await page.getByLabel('Search').fill('Pliers');
  await expect(page.getByLabel('Search')).toHaveValue('Pliers');
  await page.getByRole('button', { name: 'Search' }).click();
  const productName = page.locator('//*[@class="card-title"]');
  await expect(productName).toHaveCount(4);
});

test('Filter the catalog to hammers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('checkbox', { name: 'Hammer' }).check();
  await expect(page.getByRole('checkbox', { name: 'Hammer' })).toBeChecked();
  const productName = page.locator('//*[@class="card-title"]');
  await expect(productName).toHaveCount(7);
  await page.getByRole('checkbox', { name: 'Hammer' }).uncheck();
  await expect(page.getByRole('checkbox', { name: 'Hammer' })).not.toBeChecked();
});

test('Sort products by name', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByLabel('Sort').selectOption('name,asc');
    const productName = page.locator('//*[@class="card-title"]');
    await expect(productName.nth(0)).toBeVisible();
    await expect(productName.nth(1)).toBeVisible();
    await expect(productName.nth(2)).toBeVisible();
    await expect(productName.nth(3)).toBeVisible();
    await expect(productName.nth(4)).toBeVisible();
    await expect(productName.nth(5)).toBeVisible();
    await expect(productName.nth(6)).toBeVisible();
    await expect(productName.nth(7)).toBeVisible();
    await expect(productName.nth(8)).toBeVisible();
    await expect (productName.nth(9)).not.toBeVisible();
    await expect(productName.nth(0)).toContainText('Adjustable Wrench');
    await expect(productName.nth(0)).toHaveClass(/card-title/);

});

test('Inspect a product and add two items to the cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByText('Combination Pliers').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Combination Pliers'})).toBeVisible();
  await expect(page.getByLabel('Quantity', {exact: true})).toHaveValue('1');
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(page.getByLabel('Quantity', {exact: true})).toHaveValue('2');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toContainText('2');

});

