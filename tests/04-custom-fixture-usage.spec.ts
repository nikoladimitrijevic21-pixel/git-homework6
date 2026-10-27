import { expect, test } from '../fixtures/03-custom-fixtures';

test('logged-in user can see the account page', async ({ loggedInPage }) => {
  // No login steps are needed here. The custom fixture already did them.
  await expect(loggedInPage.getByTestId('page-title')).toContainText('My account');
});

test('logged-in user can see the cart navigation', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByTestId('nav-cart')).toBeVisible();
  await expect(loggedInPage.getByTestId('nav-sign-in')).not.toBeVisible();
});

