import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/url.json';
import {checkedPassword} from '../../helper/checkOutPassword';
import * as dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with invalid password', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;

  await mainPage.loginButton.click();
  expect(loginPopUpPage.popUp).toBeVisible();
  await loginPopUpPage.hidePasswordButton.click();

  for(const password of checkedPassword){
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.submitButton.click();

  await expect(
    loginPopUpPage.passwordErrorMessage.isVisible() || loginPopUpPage.invalidEmailOrPasswordMessage.isVisible()
  ).toBeTruthy();

}});
