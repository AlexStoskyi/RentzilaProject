import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with valid phone number and password', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const phone = process.env.PHONE_NUMBER;
  const password = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  expect(loginPopUpPage.popUp).toBeVisible();

  await loginPopUpPage.login(phone, password);
  await loginPopUpPage.clickHidePasswordButton();
  await expect(loginPopUpPage.passwordField).toHaveAttribute('type', 'text');
  await loginPopUpPage.clickHidePasswordButton();
  await expect(loginPopUpPage.passwordField).toHaveAttribute(
    'type',
    'password'
  );

  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await mainPage.avatarField.click();
  await expect(mainPage.profileDropdown).toBeVisible();

  await mainPage.LogoutButton.click();
  await expect(mainPage.avatarField).not.toBeVisible();
  await expect(mainPage.loginButton).toBeVisible();
});
