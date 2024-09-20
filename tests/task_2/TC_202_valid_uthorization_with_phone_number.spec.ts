import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/url.json';
import * as dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with valid email and password', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const phone: string | undefined= process.env.PHONE_NUMBER;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.loginButton.click();
  expect(loginPopUpPage.popUp).toBeVisible();

  await loginPopUpPage.login(phone, password);
  await loginPopUpPage.hidePasswordButton.click();
  const isPasswordVisible = await loginPopUpPage.isPasswordVisible();
  expect(isPasswordVisible).toBe(true);
  await loginPopUpPage.hidePasswordButton.click();
  const isPasswordHidden = await loginPopUpPage.isPasswordHidden();
  expect(isPasswordHidden).toBe(true);

  await loginPopUpPage.submitButton.click();
  await expect(mainPage.avatarField).toBeVisible();
  await mainPage.avatarField.click();
  await expect(mainPage.profileDropdown).toBeVisible();

  await mainPage.LogoutButton.click();
  await expect(mainPage.avatarField).not.toBeVisible();
  await expect(mainPage.loginButton).toBeVisible();
});
