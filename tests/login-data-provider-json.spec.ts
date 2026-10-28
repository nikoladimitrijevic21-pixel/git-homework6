import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedHeading: string;
};

// STEP 1: Build the path to the external JSON file.
const jsonPath = path.resolve(process.cwd(), 'test-data', 'login.json');

// STEP 2: Read the JSON file as plain text.
const jsonText = fs.readFileSync(jsonPath, 'utf8');

// STEP 3: Parse the text into an array of JavaScript objects.
const loginCases = JSON.parse(jsonText) as LoginCase[];

// STEP 4: Use every parsed object to create a separate Playwright test.
for (const data of loginCases) {
  test(`JSON data: ${data.name} can log in`, async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(data.email);
    await page.getByTestId('password').fill(data.password);
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('page-title')).toContainText(data.expectedHeading);
  });
}

