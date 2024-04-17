
import { Browser, Builder, By, Key, until, WebElement } from 'selenium-webdriver';
import 'chromedriver';
import { describe } from 'node:test';

describe('SauceDemo Tests', () => {
  let driver: Browser;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('opera').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should login successfully with valid credentials', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlIs('https://www.saucedemo.com/inventory.html'), 5000);
    const inventoryTitle = await driver.findElement(By.className('title')).getText();
    expect(inventoryTitle).toEqual('Products');
  });

  it('should display error message with invalid credentials', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('invalid_user');
    await driver.findElement(By.id('password')).sendKeys('invalid_password');
    await driver.findElement(By.id('login-button')).click();
    const errorMessage = await driver.findElement(By.css('[data-test="error"]')).getText();
    expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service');
  });

  it('should add item to cart', async () => {
    await driver.get('https://www.saucedemo.com/inventory.html');
    const addItemButton = await driver.findElement(By.css('.btn_primary'));
    await addItemButton.click();
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
    expect(cartBadge).toEqual('1');
  });

  it('should remove item from cart', async () => {
    await driver.get('https://www.saucedemo.com/inventory.html');
    const addItemButton = await driver.findElement(By.css('.btn_primary'));
    await addItemButton.click();
    await addItemButton.click();
    const removeItemButton = await driver.findElement(By.css('.btn_secondary'));
    await removeItemButton.click();
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
    expect(cartBadge).toEqual('1');
  });
});
