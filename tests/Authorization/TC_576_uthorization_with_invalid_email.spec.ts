import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { checkedEmail } from '../../helper/testCreds';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with invalid email', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const password = process.env.VALID_PASSWORD;

  await mainPage.loginButton.click();
  expect(loginPopUpPage.popUp).toBeVisible();

  for (const email of checkedEmail) {
    await loginPopUpPage.login(email, password);
    await loginPopUpPage.submitButton.click();

    await expect(
      loginPopUpPage.emailErrorMessage.isVisible() ||
        loginPopUpPage.invalidEmailOrPasswordMessage.isVisible()
    ).toBeTruthy();
  }
});
