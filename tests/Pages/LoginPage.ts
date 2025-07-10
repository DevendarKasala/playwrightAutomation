import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private nextButton: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[name="emailMobile"]');
    this.passwordInput = page.locator('[type="password"]');
    this.nextButton = page.locator('[type="submit"]');
    this.loginButton = page.locator('text="Login"');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://qa-portal.mewurk.com/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}