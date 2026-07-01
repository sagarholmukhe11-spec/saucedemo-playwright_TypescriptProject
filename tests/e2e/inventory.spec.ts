import { test, expect } from '../../fixtures';

test.describe('Inventory / Products Page Tests', () => {

  // -------------------------------------------------------
  test('@smoke - inventory page shows 6 products', async ({ loggedInPage }) => {
    await loggedInPage.assertItemCount(6);
  });

  // -------------------------------------------------------
  test('@smoke - add single item to cart updates badge', async ({ loggedInPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.assertCartCount(1);
  });

  // -------------------------------------------------------
  test('@regression - add multiple items to cart', async ({ loggedInPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.addToCart('Sauce Labs Bike Light');
    await loggedInPage.addToCart('Sauce Labs Bolt T-Shirt');
    await loggedInPage.assertCartCount(3);
  });

  // -------------------------------------------------------
  test('@regression - remove item from inventory page', async ({ loggedInPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.assertCartCount(1);

    await loggedInPage.removeFromCart('Sauce Labs Backpack');
    await loggedInPage.assertCartCount(0);
  });

  // -------------------------------------------------------
  test('@regression - sort products A to Z', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('az');
    const names = await loggedInPage.getAllItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  // -------------------------------------------------------
  test('@regression - sort products Z to A', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('za');
    const names = await loggedInPage.getAllItemNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  // -------------------------------------------------------
  test('@regression - sort products price low to high', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');
    const prices = await loggedInPage.getAllPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  // -------------------------------------------------------
  test('@regression - sort products price high to low', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('hilo');
    const prices = await loggedInPage.getAllPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

});
