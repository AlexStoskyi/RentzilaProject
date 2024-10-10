import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify specifications input field', async ({ page }) => {
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

  await expect(createUnitePage.specificationsTitle).toHaveText(
    'Технічні характеристики'
  );
  await createUnitePage.specificationsInput.click();
  await expect(createUnitePage.specificationsInput).toHaveText('');

  await createUnitePage.specificationsInput.fill('<>{};^');
  await expect(createUnitePage.specificationsInput).toHaveText('');

  let randomText = faker.lorem.text();
  while (randomText.length < 9001) {
    randomText += ' ' + faker.lorem.text();
  }
  const randomValues = randomText.substring(0, 9001);
  await createUnitePage.specificationsInput.fill(randomValues);
  const countSymbols = await createUnitePage.specificationsInput.inputValue();
  await expect(countSymbols.length).toBe(9000);
});
