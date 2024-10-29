import { test } from '../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import { imagesArr } from '../../helper/testCreds';

test.beforeEach(async ({ loginPopUpPage, createUnitePage, mainPage, photoPage }) => {
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
  await photoPage.addMultipleImages('images', imagesArr)
});

test('TC_595_Verify delete image button', async ({ photoPage }) => {
  for (let i = await photoPage.getCountOfImage() - 1; i >= 0 ; i--) {
    await photoPage.clickDeleteImageButton(i);   
  }
  await expect(photoPage.getAllImageFieldAttributeDraggable).not.toBe(true)
});
