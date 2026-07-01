import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // --- Locators ---
  private pageTitle       = () => this.page.locator('.title');
  private cartItems       = () => this.page.locator('.cart_item');
  private checkoutButton  = () => this.page.locator('[data-test="checkout"]');
  private continueShoppingBtn = () => this.page.locator('[data-test="continue-shopping"]');

  private cartItemName = (name: string) =>
    this.page.locator(`.cart_item:has(.inventory_item_name:text("${name}"))`);

  private removeItemBtn = (name: string) =>
    this.page.locator(`.cart_item:has(.inventory_item_name:text("${name}")) [data-test^="remove"]`);

  private allItemNames  = () => this.page.locator('.inventory_item_name');
  private allItemPrices = () => this.page.locator('.inventory_item_price');

  // --- Actions ---
  async removeItem(productName: string) {
    await this.removeItemBtn(productName).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }

  async continueShopping() {
    await this.continueShoppingBtn().click();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.allItemNames().allInnerTexts();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems().count();
  }

  // --- Assertions ---
  async assertOnCartPage() {
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.pageTitle()).toHaveText('Your Cart');
  }

  async assertItemInCart(productName: string) {
    await expect(this.cartItemName(productName)).toBeVisible();
  }

  async assertItemNotInCart(productName: string) {
    await expect(this.cartItemName(productName)).not.toBeVisible();
  }

  async assertCartEmpty() {
    await expect(this.cartItems()).toHaveCount(0);
  }

  async assertCartItemCount(count: number) {
    await expect(this.cartItems()).toHaveCount(count);
  }
}
