import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // --- Step One Locators ---
  private firstNameInput  = () => this.page.locator('[data-test="firstName"]');
  private lastNameInput   = () => this.page.locator('[data-test="lastName"]');
  private postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
  private continueBtn     = () => this.page.locator('[data-test="continue"]');
  private cancelBtn       = () => this.page.locator('[data-test="cancel"]');
  private errorMessage    = () => this.page.locator('[data-test="error"]');

  // --- Step Two Locators ---
  private summaryItemNames  = () => this.page.locator('.inventory_item_name');
  private summaryItemPrices = () => this.page.locator('.inventory_item_price');
  private subtotalLabel     = () => this.page.locator('.summary_subtotal_label');
  private taxLabel          = () => this.page.locator('.summary_tax_label');
  private totalLabel        = () => this.page.locator('.summary_total_label');
  private finishBtn         = () => this.page.locator('[data-test="finish"]');

  // --- Confirmation Locators ---
  private confirmationHeader  = () => this.page.locator('.complete-header');
  private confirmationText    = () => this.page.locator('.complete-text');
  private backHomeBtn         = () => this.page.locator('[data-test="back-to-products"]');

  // --- Actions ---
  async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async clickContinue() {
    await this.continueBtn().click();
  }

  async clickFinish() {
    await this.finishBtn().click();
  }

  async clickCancel() {
    await this.cancelBtn().click();
  }

  async clickBackHome() {
    await this.backHomeBtn().click();
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel().innerText();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel().innerText();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel().innerText();
    return parseFloat(text.replace('Total: $', ''));
  }

  // --- Assertions ---
  async assertOnCheckoutStepOne() {
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }

  async assertOnCheckoutStepTwo() {
    await expect(this.page).toHaveURL('/checkout-step-two.html');
  }

  async assertOnConfirmationPage() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }

  async assertOrderConfirmed() {
    await expect(this.confirmationHeader()).toHaveText('Thank you for your order!');
  }

  async assertFieldError(expectedText: string) {
    await expect(this.errorMessage()).toBeVisible();
    await expect(this.errorMessage()).toContainText(expectedText);
  }

  async assertTotalMatchesSubtotalPlusTax() {
    const subtotal = await this.getSubtotal();
    const tax      = await this.getTax();
    const total    = await this.getTotal();
    const expected = parseFloat((subtotal + tax).toFixed(2));
    expect(total).toBe(expected);
  }
}
