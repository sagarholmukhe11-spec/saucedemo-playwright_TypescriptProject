import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // --- Locators ---
  private usernameInput  = () => this.page.locator('#user-name');
  private passwordInput  = () => this.page.locator('#password');
  private loginButton    = () => this.page.locator('#login-button');
  private errorMessage   = () => this.page.locator('[data-test="error"]');

  // --- Actions ---
  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage().innerText();
  }

  // --- Assertions ---
  async assertErrorVisible(expectedText: string) {
    await expect(this.errorMessage()).toBeVisible();
    await expect(this.errorMessage()).toContainText(expectedText);
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL('/');
    await expect(this.loginButton()).toBeVisible();
  }
}
