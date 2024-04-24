const { test, expect } = require('@playwright/test');

test('Log in', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'visual_user');
    await page.fill('#password', 'secret_sauce');
    
    await page.locator('[data-test="login-button"]').click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
