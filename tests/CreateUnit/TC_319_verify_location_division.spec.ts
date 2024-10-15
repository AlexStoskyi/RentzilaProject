import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify vehicle location division', async ({ page }) => {
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

  await expect(createUnitePage.detailedDescriptionTitle).toHaveText(
    'Місце розташування технічного засобу *'
  );
  await expect(createUnitePage.mapLabelInput).toHaveText('Виберіть на мапі');

  await createUnitePage.nextButton.click();
  await expect(createUnitePage.detailedDescriptionError).toHaveText(
    'Виберіть коректне місце на мапі України'
  );
  await expect(createUnitePage.mapLabelInput).toHaveCSS(
    'border',
    '1px solid rgb(247, 56, 89)'
  );

  const address = 'Київ, вулиця Володимирська 21/20 Україна, Київська область';
  await createUnitePage.mapLabelInput.click();
  await expect(createUnitePage.mapPopUpTitle).toHaveText('Техніка на мапі');
  await expect(createUnitePage.mapPopUpCloseButton).toBeVisible();
  await expect(createUnitePage.mapPopUpAddressTitle).toHaveText(address);
  await expect(createUnitePage.mapPopUpMapField).toBeVisible();
  await createUnitePage.mapPopUpSubmitButton.click();
  await expect(createUnitePage.mapLabelInput).toHaveText(address);

  await createUnitePage.mapLabelInput.click();
  await createUnitePage.mapPopUpCityInput.fill('Бровари');
  await createUnitePage.mapPopUpDropDown.click();
  const newAddress = await createUnitePage.mapPopUpAddressTitle.innerText();
  await createUnitePage.mapPopUpSubmitButton.click();
  await expect(createUnitePage.mapLabelInput).toHaveText(newAddress);
});
