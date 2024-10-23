import { test } from '../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import { imagesArr } from '../../helper/testCreds';

test.beforeEach(async ({ loginPopUpPage, createUnitePage, mainPage }) => {
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.open(url.create_unit);
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

test('TC_593_Verify 12 images uploading', async ({ photoPage }) => {
  await expect(await photoPage.titlePage).toBeVisible();

  await photoPage.addMultipleImages('images', imagesArr)
  await expect(await photoPage.getMainImageText()).toContain('Головне');
});
