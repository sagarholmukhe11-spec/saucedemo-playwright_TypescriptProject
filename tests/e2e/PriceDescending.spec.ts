import { test, expect } from '@playwright/test';


test('price Desending order', async ({ page }) => {

//open the saucedemo website and login to the website
    await page.goto('https://www.saucedemo.com/inventory.html');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();


    await expect(page).toHaveURL(/inventory.html/);

//click on the filter dropdown and select price high to low

await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

//capture all product prices on the page and print the prices to the console

const productprice= await page.locator('[data-test="inventory-item-price"]').allTextContents();

console.log('Price:', productprice);

// convert $2.99 to 2.99 and store in an array

const actualPrices = productprice.map(price => parseFloat(price.replace('$','')));

//sort the actualprices array in descending order

const expectedPrices =[...actualPrices].sort((a,b) => b-a);

//verify UI prices are in descending order
expect(actualPrices).toEqual(expectedPrices);

//log the actual and expected prices to the console
console.log('Actual Prices:', actualPrices);
console.log('Expected Prices:', expectedPrices);



})

