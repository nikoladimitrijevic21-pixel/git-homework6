import { test, expect } from '@playwright/test';


test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="product-01M5AAVAZJWK8JG7RBZXJTENE3"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-home"]').click();
  await page.locator('[data-test="product-01M5AAVAZX9VHBE2C3QRPWX383"]').click();
  await page.getByTestId('add-to-cart').click();
  await expect(page.getByTestId('cart-quantity')).toHaveText('2');
});



//  await page.getByTestId('add-to-cart').click();
 // await expect(page.getByTestId('cart-quantity')).toHaveText('1');




test('test2', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="product-01M5AAVAZJWK8JG7RBZXJTENE3"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-home"]').click();
  await page.locator('[data-test="product-01M5AAVAZX9VHBE2C3QRPWX383"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-cart"]').click();
  await page.locator('.btn.btn-danger').first().click();
});