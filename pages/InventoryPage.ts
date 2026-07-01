import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  // --- Locators ---
  private pageTitle        = () => this.page.locator('.title');
  private inventoryItems   = () => this.page.locator('.inventory_item');
  private cartBadge        = () => this.page.locator('.shopping_cart_badge');
  private cartIcon         = () => this.page.locator('.shopping_cart_link');
  private sortDropdown     = () => this.page.locator('[data-test="product-sort-container"]');
  private menuButton       = () => this.page.locator('#react-burger-menu-btn');
  private logoutLink       = () => this.page.locator('#logout_sidebar_link');

  private addToCartBtn = (productName: string) =>
    this.page.locator(`.inventory_item:has(.inventory_item_name:text("${productName}")) button`);

  private removeBtn = (productName: string) =>
    this.page.locator(`.inventory_item:has(.inventory_item_name:text("${productName}")) button`);

  private productPrice = (productName: string) =>
    this.page.locator(`.inventory_item:has(.inventory_item_name:text("${productName}")) .inventory_item_price`);

  private allPrices     = () => this.page.locator('.inventory_item_price');
  private allItemNames  = () => this.page.locator('.inventory_item_name');

  // --- Actions ---
  async addToCart(productName: string) {
    await this.addToCartBtn(productName).click();
  }

  async removeFromCart(productName: string) {
    await this.removeBtn(productName).click();
  }

  async goToCart() {
    await this.cartIcon().click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown().selectOption(option);
  }

  async logout() {
    await this.menuButton().click();
    await this.logoutLink().click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.cartBadge();
    if (await badge.isVisible()) {
      return parseInt(await badge.innerText());
    }
    return 0;
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.allPrices().allInnerTexts();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async getAllItemNames(): Promise<string[]> {
    return await this.allItemNames().allInnerTexts();
  }

  async getProductPrice(productName: string): Promise<number> {
    const text = await this.productPrice(productName).innerText();
    return parseFloat(text.replace('$', ''));
  }

  // --- Assertions ---
  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.pageTitle()).toHaveText('Products');
  }

  async assertCartCount(expected: number) {
    if (expected === 0) {
      await expect(this.cartBadge()).not.toBeVisible();
    } else {
      await expect(this.cartBadge()).toHaveText(String(expected));
    }
  }

  async assertItemCount(expected: number) {
    await expect(this.inventoryItems()).toHaveCount(expected);
  }
}
