import { expect, test } from '@playwright/test';

test('Playwright gives the test a page and browser context', async ({
  page,
  context,
}) => {
  // "page" is a built-in fixture: a fresh browser tab for this test.
  await page.goto('/');
  await expect(page.getByTestId('nav-sign-in')).toBeVisible();

  // "context" is another built-in fixture: an isolated browser session.
  // The page created for this test belongs to that context.
  await expect(context.pages()).toContain(page);
});

test('fixture isolation gives the next test a clean session', async ({ page }) => {
  await page.goto('/auth/login');

  // This test did not inherit a logged-in session from another test.
  await expect(page.getByTestId('email')).toHaveValue('');
  await expect(page.getByTestId('password')).toHaveValue('');
});

