import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify description section', async ({ page }) => {
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

  await expect(createUnitePage.descriptionTitle).toHaveText('Детальний опис');
  await createUnitePage.descriptionInput.click();
  await expect(createUnitePage.specificationsInput).toHaveText('');

  await createUnitePage.descriptionInput.fill('<>{};^');
  await expect(createUnitePage.descriptionInput).toHaveText('');

  let randomText = faker.lorem.text();
  while (randomText.length < 9001) {
    randomText += ' ' + faker.lorem.text();
  }
  const randomValues = randomText.substring(0, 9001);
  await createUnitePage.descriptionInput.fill(randomValues);
  const countSymbols = await createUnitePage.descriptionInput.inputValue();
  await expect(countSymbols.length).toBe(9000);
});
