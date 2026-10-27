import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import * as XLSX from 'xlsx';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedHeading: string;
};

// STEP 1: Build the path to the external Excel file.
const excelPath = path.join(process.cwd(), 'data', 'login-users.xlsx');

// STEP 2: Read the Excel file as binary data.
const excelBuffer = fs.readFileSync(excelPath);

// STEP 3: Parse the binary data into a workbook and select its first sheet.
const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// STEP 4: Convert the worksheet rows into JavaScript objects.
const loginCases = XLSX.utils.sheet_to_json<LoginCase>(worksheet);

// STEP 5: Use every parsed object to create a separate Playwright test.
for (const data of loginCases) {
  test(`Excel data: ${data.name} can log in`, async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByTestId('email').fill(data.email);
    await page.getByTestId('password').fill(data.password);
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('page-title')).toContainText(data.expectedHeading);
  });
}

