import { type Locator, type Page } from '@playwright/test';


export class LoginPage {
  readonly page: Page;
  readonly emailAddress: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly ErrorMessage: Locator;
  readonly menuButton: Locator;
  readonly signOutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailAddress = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login'});
    this.ErrorMessage = page.getByText('Invalid email or password', { exact: true });
    this.menuButton = page.getByTestId('nav-menu');
    this.signOutLink = page.getByTestId('nav-sign-out');

  }

  async open(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailAddress.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.signOutLink.click();
  }
}
