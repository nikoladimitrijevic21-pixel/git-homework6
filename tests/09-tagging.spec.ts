import { expect, test } from '@playwright/test';

test(
  'login page displays the authentication form',
  {
    tag: ['@smoke', '@authentication'],
  },
  async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page.getByTestId('email')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  },
);

test(
  'home page displays the sign-in navigation',
  {
    tag: ['@regression', '@navigation'],
  },
  async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('nav-sign-in')).toBeVisible();
  },
);

// # Include a tag
// npx playwright test --grep "@smoke"

// # Include either tag
// npx playwright test --grep "@smoke|@regression"

// # Exclude a tag
// npx playwright test --grep-invert "@regression"
