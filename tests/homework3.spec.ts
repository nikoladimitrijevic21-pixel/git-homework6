import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';



test ('login', async ({ page }) => {
const loginPage=new LoginPage(page);
await loginPage.open();
await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

});

test('Adding two items and update the cart badge', async ({ page }) => {
  const loginPage=new LoginPage(page);
  await loginPage.open();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  const homePage = new HomePage(page);
  await homePage.open();     
  await expect(homePage.cartBadge).not.toBeVisible();
  await homePage.addItemToCart(homePage.combinationPliers);
  await expect(homePage.cartBadge).toHaveText('1');
  await homePage.addItemToCart(homePage.boltCutters);
  await expect(homePage.cartBadge).toHaveText('2');
});

test('Removing an item and update the cart badge', async ({ page }) => {
  const loginPage=new LoginPage(page);
  await loginPage.open();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  const homePage = new HomePage(page);
  await homePage.open();
  await expect(homePage.cartBadge).not.toBeVisible();
  await homePage.addItemToCart(homePage.combinationPliers);
  await expect(homePage.cartBadge).toHaveText('1');
  await homePage.addItemToCart(homePage.boltCutters);
  await expect(homePage.cartBadge).toHaveText('2');
  await homePage.removeItemFromCart();
  await expect(homePage.cartBadge).toHaveText('1');
});
