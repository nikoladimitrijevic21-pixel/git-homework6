
import { expect, Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = { loggedInPage: Page }; 
export const test = base.extend<Fixtures>({ 
loggedInPage: async ({ page }, use) => { 
const loginPage = new LoginPage(page); 
await loginPage.open(); 
await loginPage.login('customer2@practicesoftwaretesting.com', 'welcome01'); 
await use(page);
await loginPage.logout();

}, 
}); 

export { expect };

