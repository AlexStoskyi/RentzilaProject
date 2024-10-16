import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify body title and tab titles ', async ({ page }) => {
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

  const getAttributeMainBoxInfo =
    await createUnitePage.mainBoxInfo.getAttribute('class');
  const isActive = getAttributeMainBoxInfo?.includes('CustomLabel_labelActive');
  await expect(isActive).toBe(true);
  await expect(createUnitePage.mainBoxRoot).toBeVisible();
  await expect(createUnitePage.mainBoxInfo).toBeVisible(),
  await expect(createUnitePage.mainBoxPhoto).toBeVisible(),
  await expect(createUnitePage.mainBoxServices).toBeVisible(),
  await expect(createUnitePage.mainBoxCost).toBeVisible(),
  await expect(createUnitePage.mainBoxContacts).toBeVisible()
});
