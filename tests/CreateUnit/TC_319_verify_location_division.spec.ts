import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import expectText from '../../helper/expectText.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify vehicle location division', async ({ page }) => {
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

  await expect(createUnitePage.detailedDescriptionTitle).toHaveText(
    expectText.technicalLocation
  );
  await expect(createUnitePage.mapLabelInput).toHaveText(expectText.pickOnMap);
  await createUnitePage.clickNextButton();
  await expect(createUnitePage.detailedDescriptionError).toHaveText(
    expectText.pickOnUkrMap
  );
  await expect(createUnitePage.mapLabelInput).toHaveCSS(
    'border',
    '1px solid rgb(247, 56, 89)'
  );

  const address = expectText.address;
  await createUnitePage.clickMapLabelInput();
  await expect(createUnitePage.mapPopUpTitle).toHaveText(
    expectText.technicOnMap
  );
  await expect(createUnitePage.mapPopUpCloseButton).toBeVisible();
  await expect(createUnitePage.mapPopUpAddressTitle).toHaveText(address);
  await expect(createUnitePage.mapPopUpMapField).toBeVisible();
  await createUnitePage.clickMapPopUpSubmitButton();
  await expect(createUnitePage.mapLabelInput).toHaveText(address);

  await createUnitePage.clickMapLabelInput();
  await createUnitePage.mapPopUpCityInput.fill(expectText.brovary);
  await createUnitePage.mapPopUpDropDown.click();
  const newAddress = await createUnitePage.mapPopUpAddressTitle.innerText();
  await createUnitePage.clickMapPopUpSubmitButton();
  await expect(createUnitePage.mapLabelInput).toHaveText(newAddress);
});
