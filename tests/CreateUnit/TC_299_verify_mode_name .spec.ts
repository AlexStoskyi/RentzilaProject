import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { testSymbols } from '../../helper/testCreds';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify model name input field', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.loginButton.click();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.submitButton.click();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  await expect(createUnitePage.modelNameTitle).toHaveText('Назва моделі');
  const inputBackGroundText =
    await createUnitePage.modelNameInput.getAttribute('placeholder');
  await expect(inputBackGroundText).toBe('Введіть назву моделі');

  for (let i = 0; i < testSymbols.length; i++) {
    await createUnitePage.modelNameInput.fill(testSymbols[i]);
    await expect(createUnitePage.modelNameError).toHaveText(
      'У назві моделі може бути не більше 15 символів'
    );
  }

  await createUnitePage.modelNameInput.fill('<>{};^');
  await expect(createUnitePage.modelNameInput).toHaveText('');

  await createUnitePage.modelNameInput.fill('012345678901234');
  await expect(createUnitePage.modelNameError).not.toBeVisible();
});
