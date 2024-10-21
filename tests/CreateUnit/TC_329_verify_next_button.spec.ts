import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify ""Далі"" button', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);
  await mainPage.clickCloseTelegramButton();

  await expect(createUnitePage.nextButton).toHaveText(expectText.next);

  await createUnitePage.clickNextButton();
  await expect(createUnitePage.announcementTitleError).toBeVisible(),
    await expect(
      createUnitePage.manufacturerTransportEquipmentError
    ).toBeVisible(),
    await expect(createUnitePage.detailedDescriptionError).toBeVisible(),
    await expect(createUnitePage.categoryErrorMessage).toBeVisible(),
    await createUnitePage.chooseCategory();

  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);

  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();

  await createUnitePage.clickMapLabelInput();
  await createUnitePage.clickMapPopUpSubmitButton();
  const address = expectText.address;
  await expect(createUnitePage.mapLabelInput).toHaveText(address);

  await createUnitePage.clickNextButton();
  await expect(createUnitePage.title).toBeVisible();
  await expect(createUnitePage.photoEquipmentTitle).toHaveText(
    expectText.photoOfTechnic
  );
});
