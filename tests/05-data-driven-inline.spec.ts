import { expect, test } from '@playwright/test';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedHeading: string;
};

// Use inline data when the list is short and belongs only to this test.
const loginCases: LoginCase[] = [
  {
    name: 'primary customer',
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
    expectedHeading: 'My account',
  },
  {
    name: 'second customer',
    email: 'customer2@practicesoftwaretesting.com',
    password: 'welcome01',
    expectedHeading: 'My account',
  },
  {
    name: 'third customer',
    email: 'customer3@practicesoftwaretesting.com',
    password: 'pass1234',
    expectedHeading: 'My account',
  }
];

for (const data of loginCases) {
  test(`inline data: ${data.name}  can log in`, async ({ page }) => {/*placeholder*/
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(data.email);/*placeholder*/
    await page.getByTestId('password').fill(data.password);/*placeholder*/
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('page-title')).toContainText(data.expectedHeading);/*placeholder*/
  });
}

