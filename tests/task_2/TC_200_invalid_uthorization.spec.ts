import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Authorization with empty fields ', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  await mainPage.loginButton.click();
  expect(loginPopUpPage.popUp).toBeVisible();

  await loginPopUpPage.submitButton.click();
  const errorMessageEmail = await loginPopUpPage.emailErrorMessage;
  const errorMessagePassword = await loginPopUpPage.passwordErrorMessage
  await expect(errorMessageEmail).toContainText('Поле не може бути порожнім');
  await expect(errorMessageEmail).toBeVisible();
  await expect(errorMessageEmail).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  );


  await expect(errorMessagePassword).toContainText(
    'Поле не може бути порожнім'
  );
  await expect(errorMessagePassword).toBeVisible();
  await expect(errorMessagePassword).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  );


  await loginPopUpPage.login('alexstoskyi@gmail.com', "");
  await loginPopUpPage.submitButton.click();
  await expect(errorMessageEmail).not.toBeVisible();
  await expect(errorMessagePassword).toContainText(
    'Поле не може бути порожнім'
  );
  await expect(errorMessagePassword).toBeVisible();
  await expect(errorMessagePassword).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  );


  await loginPopUpPage.login('','Testuser10');
  await loginPopUpPage.submitButton.click();
  await expect(errorMessageEmail).toContainText('Поле не може бути порожнім');
  await expect(errorMessageEmail).toBeVisible();
  await expect(errorMessageEmail).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  ); 
  await expect(errorMessagePassword).not.toBeVisible(); 
});
