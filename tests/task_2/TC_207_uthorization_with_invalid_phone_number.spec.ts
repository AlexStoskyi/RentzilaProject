import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/url.json';
import {checkedNumber} from '../../helper/checkOutNumber';
import * as dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with invalid phone number', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.loginButton.click();
  expect(loginPopUpPage.popUp).toBeVisible();

//  const errorPhoneNumber = checkedNumber;
  for(const phone of checkedNumber){
  await loginPopUpPage.login(phone, password);
  await loginPopUpPage.submitButton.click();

  const errorMessageEmail = await loginPopUpPage.emailErrorMessage;
  await expect(errorMessageEmail).toContainText('Неправильний формат email або номера телефону');
  await expect(errorMessageEmail).toBeVisible();
  await expect(errorMessageEmail).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  );}
});
