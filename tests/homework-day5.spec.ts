
import { expect, test } from '../fixtures/fixtures';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';


test('confirms the account page is open', async ({ loggedInPage }) => {
await expect(loggedInPage.getByTestId('page-title')).toContainText('My account');
  });


test.describe('catalog hooks', () => {
  test.beforeAll(() => {
const startedAt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Belgrade',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'longOffset',
}).format(new Date());
console.log(`Catalog suite started at ${startedAt}`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('page-after-failure', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log('Test suite finished');
  });

  test('confirms the catalog page loaded', async ({ page }) => {
    const catalogList = page.getByRole('heading', { level: 5 });
    await expect(catalogList).toHaveCount(9);
  });
});


type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: string;
};


const csvPath = path.join(process.cwd(), 'test-data', 'login_cases.csv');

const csvText = fs.readFileSync(csvPath, 'utf8');

const loginCases = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
}) as LoginCase[];



for (const data of loginCases) {
  test(`CSV data: ${data.name} - Check valid vs invalid credentials`, async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(data.email);
    await page.getByTestId('password').fill(data.password);
    await page.getByTestId('login-submit').click();
    if (data.expectedResult === '/account') {
      await expect(page).toHaveURL('/account');
    } else {
      await expect(page.getByText('Invalid email or password', { exact: true })).toBeVisible();
    }
  });
}