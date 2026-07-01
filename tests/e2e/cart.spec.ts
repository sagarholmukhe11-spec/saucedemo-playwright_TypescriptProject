import { test, expect } from '../../fixtures';

test.describe('Cart Tests', () => {

  // -------------------------------------------------------
  test('@smoke - added item appears in cart', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.goToCart();

    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart('Sauce Labs Backpack');
  });

  // -------------------------------------------------------
  test('@regression - multiple items appear in cart', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.addToCart('Sauce Labs Fleece Jacket');
    await loggedInPage.goToCart();

    await cartPage.assertOnCartPage();
    await cartPage.assertCartItemCount(2);
    await cartPage.assertItemInCart('Sauce Labs Backpack');
    await cartPage.assertItemInCart('Sauce Labs Fleece Jacket');
  });

  // -------------------------------------------------------
  test('@regression - remove item from cart', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.addToCart('Sauce Labs Bike Light');
    await loggedInPage.goToCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    await cartPage.assertItemNotInCart('Sauce Labs Backpack');
    await cartPage.assertItemInCart('Sauce Labs Bike Light');
    await cartPage.assertCartItemCount(1);
  });

  // -------------------------------------------------------
  test('@regression - empty cart shows no items', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertCartEmpty();
  });

  // -------------------------------------------------------
  test('@regression - continue shopping returns to inventory', async ({ loggedInPage, cartPage, inventoryPage }) => {
    await loggedInPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.assertOnInventoryPage();
  });

});
