import { expect, Page, test as base } from '@playwright/test';

type AppFixtures = {
  loggedInPage: Page;
};

// A custom fixture describes a reusable starting condition.
// Any test that asks for "loggedInPage" receives a page that is already logged in.
export const test = base.extend<AppFixtures>({
  loggedInPage: async ({ page }, use) => {
    // SETUP: prepare the page before the test starts.
    await page.goto('/auth/login');
    await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
    await page.getByTestId('password').fill('welcome01');
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('page-title')).toContainText('My account');

    // GIVE: Playwright gives the prepared page to the test here.
    await use(page);

    // CLEANUP: code after use() runs after the test finishes.
    // The built-in page fixture closes the page automatically.
  },
});

export { expect };