import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedHeading: string;
};

// STEP 1: Build the path to the external CSV file.
const csvPath = path.join(process.cwd(), 'data', 'login-users.csv');

// STEP 2: Read the CSV file as plain text.
const csvText = fs.readFileSync(csvPath, 'utf8');

// STEP 3: Parse every CSV row into a JavaScript object.
const loginCases = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
}) as LoginCase[];

// STEP 4: Use every parsed object to create a separate Playwright test.
for (const data of loginCases) {
  test(`CSV data: ${data.name} can log in`, async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(data.email);
    await page.getByTestId('password').fill(data.password);
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('page-title')).toContainText(data.expectedHeading);
  });
}

