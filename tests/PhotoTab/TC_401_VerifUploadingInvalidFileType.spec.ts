import { test, expect } from '@playwright/test';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import { CreateUnitPage } from '../../pages/createUnitePage';
import { PhotoPage } from '../../pages/createUnitePhotoPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json';
import { BasePage } from '../../pages/page';

test.beforeEach(async ({ page }) => {
  await page.goto(url.create_unit);
});

test('TC_401_Verify uploading of invalid file type', async ({ page }) => {
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const photoPage = new PhotoPage(page);
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await createUnitePage.chooseCategory();
  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await createUnitePage.clickMapLabelInput();
  await createUnitePage.clickMapPopUpSubmitButton();
  await createUnitePage.clickNextButton();

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
