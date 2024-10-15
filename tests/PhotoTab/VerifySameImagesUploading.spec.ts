import { test, expect } from '@playwright/test';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import { CreateUnitPage } from '../../pages/createUnitePage';
import { MainPage } from '../../pages/mainPage';
import { PhotoPage } from '../../pages/createUnitePhotoPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import * as path from 'path';

test.beforeEach(async ({ page }) => {
  // await page.goto(url.home_page);
  await page.goto(url.create_unit);
});

test('TC_384_Verify same images uploading', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const photoPage = new PhotoPage(page);
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.login(login, password);
  await loginPopUpPage.submitButton.click();
  await createUnitePage.chooseCategory();
  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.manufacturerTransportEquipmentDropDown.click();
  await createUnitePage.mapLabelInput.click();
  await createUnitePage.mapPopUpSubmitButton.click();
  await createUnitePage.nextButton.click();


  // const filePath = path.resolve('/Users/oleksandr/Desktop/first-task/image');
  // // await photoPage.firstAddImageField.click();
  // await photoPage.firstAddImageField.setInputFiles(filePath);


  const fileChooserPromise = page.waitForEvent('filechooser');
  await photoPage.firstAddImageField.click();
  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles('./tests/PhotoTab/image/forTests.jpeg');
  await photoPage.secondAddImageField.click();
  await fileChooser.setFiles('./tests/PhotoTab/image/forTests.jpeg');
  await expect(photoPage.popUpError).toBeVisible();
});
