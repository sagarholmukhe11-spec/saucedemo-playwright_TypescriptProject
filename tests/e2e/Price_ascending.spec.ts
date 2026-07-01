import { test, expect } from '@playwright/test';

test('Price ascending order', async ({ page }) => {
    
//open the saucedemo website

await page.goto('https://www.saucedemo.com/inventory.html'); 

//login to the website
await page.fill('#user-name', 'standard_user');
await page.fill('#password','secret_sauce');
await page.click('#login-button');

await expect(page).toHaveURL(/inventory.html/);

//click on the filter dropdown and select price low to high
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 
 // Capture all product prices on the page and print the prices to the console
 const productprice =
await page.locator('[data-test="inventory-item-price"]').allTextContents();

console.log(productprice);

// Capture all product prices on the page and print the count and text contents to the console

const prices = page.locator('[data-test="inventory-item-price"]');

console.log('Count =', await prices.count());

console.log('Texts =', await prices.allTextContents());


 //Convert $2.99 to 2.99 and store in an array

 const actualPrices =productprice.map(price=> parseFloat(price.replace('$', '')));

 //sort the actualprices array in ascending order 

 const expectedPrices=[...actualPrices].sort( (a,b) => a-b);
 
//Verify UI prices are in ascending order
expect(actualPrices).toEqual(expectedPrices);

//log the actual and expected prices to the console
console.log('Actual Prices:', actualPrices);
console.log('Expected Prices:', expectedPrices);


});

