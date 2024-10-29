import { test } from './../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json'

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

test('TC_401_Verify uploading of invalid file type', async ({ photoPage }) => {
  await expect(await photoPage.titlePage).toBeVisible();

  await photoPage.fileChooser('', 'invalid_type.txt', 0);
  await expect(photoPage.popUpContent).toBeVisible();
  await expect(photoPage.popUpContentError).toHaveText(
    expectText.popUpContentErrorText
  );

  await photoPage.clickClosePopUpContent();
  await expect(photoPage.popUpContent).not.toBeVisible();
  for (let i = 0; i < 4; i++) {
    await expect(await photoPage.getUploadFieldByIndex(i)).toHaveAttribute(
      'draggable',
      'false'
    );
  }

  await photoPage.fileChooser('', 'invalid_type.txt', 0);
  await photoPage.clickSavePopUpContent();
  await expect(photoPage.popUpContent).not.toBeVisible();
  for (let i = 0; i < 4; i++) {
    await expect(await photoPage.getUploadFieldByIndex(i)).toHaveAttribute(
      'draggable',
      'false'
    );
  }

  await photoPage.fileChooser('', 'invalid_type.txt', 0);
  await photoPage.clickOutsidePopUpContent(100, 200);
  await expect(photoPage.popUpContent).not.toBeVisible();
  for (let i = 0; i < 4; i++) {
    await expect(await photoPage.getUploadFieldByIndex(i)).toHaveAttribute(
      'draggable',
      'false'
    );
  }
});
