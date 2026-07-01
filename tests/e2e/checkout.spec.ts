import { test, expect } from '../../fixtures';

test.describe('Checkout Tests', () => {

  // Helper: add item and go to checkout step one
  async function goToCheckout(loggedInPage: any, cartPage: any, checkoutPage: any) {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnCheckoutStepOne();
  }

  // -------------------------------------------------------
  test('@smoke - complete full checkout flow', async ({
    loggedInPage, cartPage, checkoutPage, inventoryPage
  }) => {
    // Add item to cart
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.addToCart('Sauce Labs Bike Light');
    await loggedInPage.goToCart();

    // Cart → Checkout step 1
    await cartPage.assertCartItemCount(2);
    await cartPage.proceedToCheckout();
    await checkoutPage.assertOnCheckoutStepOne();

    // Fill shipping details
    await checkoutPage.fillShippingDetails('Sagar', 'Patil', '411001');
    await checkoutPage.clickContinue();

    // Review order summary
    await checkoutPage.assertOnCheckoutStepTwo();
    await checkoutPage.assertTotalMatchesSubtotalPlusTax();

    // Place order
    await checkoutPage.clickFinish();
    await checkoutPage.assertOnConfirmationPage();
    await checkoutPage.assertOrderConfirmed();
  });

  // -------------------------------------------------------
  test('@regression - missing first name shows error', async ({
    loggedInPage, cartPage, checkoutPage
  }) => {
    await goToCheckout(loggedInPage, cartPage, checkoutPage);
    await checkoutPage.fillShippingDetails('', 'Patil', '411001');
    await checkoutPage.clickContinue();
    await checkoutPage.assertFieldError('First Name is required');
  });

  // -------------------------------------------------------
  test('@regression - missing last name shows error', async ({
    loggedInPage, cartPage, checkoutPage
  }) => {
    await goToCheckout(loggedInPage, cartPage, checkoutPage);
    await checkoutPage.fillShippingDetails('Sagar', '', '411001');
    await checkoutPage.clickContinue();
    await checkoutPage.assertFieldError('Last Name is required');
  });

  // -------------------------------------------------------
  test('@regression - missing postal code shows error', async ({
    loggedInPage, cartPage, checkoutPage
  }) => {
    await goToCheckout(loggedInPage, cartPage, checkoutPage);
    await checkoutPage.fillShippingDetails('Sagar', 'Patil', '');
    await checkoutPage.clickContinue();
    await checkoutPage.assertFieldError('Postal Code is required');
  });

  // -------------------------------------------------------
  test('@regression - order total equals subtotal plus tax', async ({
    loggedInPage, cartPage, checkoutPage
  }) => {
    await loggedInPage.addToCart('Sauce Labs Fleece Jacket');
    await loggedInPage.addToCart('Sauce Labs Bolt T-Shirt');
    await loggedInPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails('Sagar', 'Patil', '411001');
    await checkoutPage.clickContinue();
    await checkoutPage.assertTotalMatchesSubtotalPlusTax();
  });

  // -------------------------------------------------------
  test('@regression - cancel on step one goes back to cart', async ({
    loggedInPage, cartPage, checkoutPage
  }) => {
    await goToCheckout(loggedInPage, cartPage, checkoutPage);
    await checkoutPage.clickCancel();
    await cartPage.assertOnCartPage();
  });

  // -------------------------------------------------------
  test('@smoke - back to products after order goes to inventory', async ({
    loggedInPage, cartPage, checkoutPage, inventoryPage
  }) => {
    await loggedInPage.addToCart('Sauce Labs Backpack');
    await loggedInPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails('Sagar', 'Patil', '411001');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.assertOrderConfirmed();
    await checkoutPage.clickBackHome();
    await inventoryPage.assertOnInventoryPage();
  });

});
