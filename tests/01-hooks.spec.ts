import { expect, test } from '@playwright/test';


// beforeAll runs once before this group of tests starts.
test.beforeAll(() => {
  console.log('Starting account tests');
});

// beforeEach runs before EVERY test in this file.
// It removes repeated preparation from the individual tests.
test.beforeEach(async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
});



// afterEach runs after EVERY test, even when the test fails.
// This is a good place for diagnostics and cleanup.
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('page-after-failure', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  }
});

// afterAll runs once after every test in this file has finished.
test.afterAll(() => {
  console.log('Finished account tests');
});

test('logged-in user sees the account page', async ({ page }) => {
  await expect(page.getByTestId('page-titl')).toContainText('My account');
});

