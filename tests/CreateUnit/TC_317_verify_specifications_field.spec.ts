import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import expectText from '../../helper/expectText.json';
import { TextHelper } from '../../helper/textHelper';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify specifications input field', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const textHelper = new TextHelper();
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  await expect(createUnitePage.specificationsTitle).toHaveText(expectText.specifications);
  await createUnitePage.specificationsInput.click();
  await expect(createUnitePage.specificationsInput).toHaveText('');

  await createUnitePage.specificationsInput.fill('<>{};^');
  await expect(createUnitePage.specificationsInput).toHaveText('');

  const randomValues = await textHelper.generateLongRandomText().substring(0, 9001);
  await createUnitePage.specificationsInput.fill(randomValues);
  const countSymbols = await createUnitePage.specificationsInput.inputValue();
  await expect(countSymbols.length).toBe(9000);
});
