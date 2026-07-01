import { test, expect, users } from '../../fixtures';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // -------------------------------------------------------
  test('@smoke - valid login navigates to inventory', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await inventoryPage.assertOnInventoryPage();
  });

  // -------------------------------------------------------
  test('@regression - locked out user sees error message', async ({ loginPage }) => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    await loginPage.assertErrorVisible('Sorry, this user has been locked out');
  });

  // -------------------------------------------------------
  test('@regression - wrong credentials show error', async ({ loginPage }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.assertErrorVisible('Username and password do not match');
  });

  // -------------------------------------------------------
  test('@regression - empty username shows error', async ({ loginPage }) => {
    await loginPage.login('', users.standardUser.password);
    await loginPage.assertErrorVisible('Username is required');
  });

  // -------------------------------------------------------
  test('@regression - empty password shows error', async ({ loginPage }) => {
    await loginPage.login(users.standardUser.username, '');
    await loginPage.assertErrorVisible('Password is required');
  });

  // -------------------------------------------------------
  test('@smoke - logout returns to login page', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.logout();
    await loginPage.assertOnLoginPage();
  });

});
