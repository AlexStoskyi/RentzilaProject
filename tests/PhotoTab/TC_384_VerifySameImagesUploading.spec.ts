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

test('TC_384_Verify same images uploading', async ({ photoPage }) => {
  await expect(await photoPage.titlePage).toBeVisible();

  for (let i = 0; i < 2; i++) {
    await photoPage.fileChooser('images', '1.jpeg', i);
  }
  await expect(photoPage.popUpContent).toBeVisible();
  await expect(photoPage.popUpContentError).toHaveText(
    expectText.sameImage
  );
  
  await photoPage.clickClosePopUpContent();
  expect((await photoPage.getAllImageFieldAttributeDraggable()).length).toBe(1);

  for (let i = 1; i < 2; i++) {
    await photoPage.fileChooser('images', '1.jpeg', i);
  }
  await photoPage.clickSavePopUpContent();
  expect((await photoPage.getAllImageFieldAttributeDraggable()).length).toBe(1);

  for (let i = 1; i < 2; i++) {
    await photoPage.fileChooser('images', '1.jpeg', i);
  }
  await photoPage.clickOutsidePopUpContent(100, 200);
  expect((await photoPage.getAllImageFieldAttributeDraggable()).length).toBe(1);
});
