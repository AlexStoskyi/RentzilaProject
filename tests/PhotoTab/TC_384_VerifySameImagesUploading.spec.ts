import { test } from './../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ loginPopUpPage, createUnitePage, page, mainPage }) => {
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await page.open(url.create_unit);
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await mainPage.clickCloseTelegramButton();
  await createUnitePage.chooseCategory();
  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await createUnitePage.clickMapLabelInput();
  await createUnitePage.clickMapPopUpSubmitButton();
  await createUnitePage.clickNextButton();
});

test('TC_384_Verify same images uploading', async ({ photoPage }) => {
  await expect(await photoPage.titlePage).toBeVisible();

  for (let i = 0; i < 2; i++) {
    await photoPage.fileChooser('images', '1.jpeg', i);
  }
});
