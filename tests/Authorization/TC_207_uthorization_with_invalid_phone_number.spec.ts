import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { checkedNumber } from '../../helper/testCreds';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with invalid phone number', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const password = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  expect(loginPopUpPage.popUp).toBeVisible();

  for (const phone of checkedNumber) {
    await loginPopUpPage.login(phone, password);
    await loginPopUpPage.clickSubmitButton();

    const errorMessageEmail = await loginPopUpPage.emailErrorMessage;
    await expect(errorMessageEmail).toContainText(
      'Неправильний формат email або номера телефону'
    );
    await expect(errorMessageEmail).toBeVisible();
    await expect(errorMessageEmail).toHaveCSS('color', 'rgb(247, 56, 89)');
  }
});
