import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import expectText from '../../helper/expectText.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify ""Скасувати"" button', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  await expect(createUnitePage.cancelButton).toHaveText(expectText.cancel);

  await createUnitePage.cancelButton.click();
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await expect(page.url()).toBe(url.home_page);
});
