import { test, expect } from '@playwright/test';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import { CreateUnitPage } from '../../pages/createUnitePage';
import { PhotoPage } from '../../pages/createUnitePhotoPage';
import { ServicesPage } from '../../pages/createUniteServicesPage';
import { MainPage } from '../../pages/mainPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json';
import { TextHelper } from '../../helper/textHelper';

test.beforeEach(async ({ page }) => {
  await page.goto(url.create_unit);
});

test('TC_409_Verify input section and choosing of existing sevice', async ({
  page,
}) => {
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const photoPage = new PhotoPage(page);
  const mainPage = new MainPage(page);
  const servicesPage = new ServicesPage(page);
  const textHelper = new TextHelper();
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

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
  await photoPage.fileChooser('images', '1.jpeg');
  await createUnitePage.clickNextButton();

  await expect(await servicesPage.getFlowServicesText()).toBe(
    expectText.servicesFlowText
  );
  await expect(await servicesPage.servicesInputField).toBeVisible();
  await expect(await servicesPage.inputFieldSearch).toBeVisible();
  await expect(await servicesPage.getTextInputField()).toContain(
    expectText.servicesSearchPlaceHolderText
  );

  await servicesPage.fillSymbols(expectText.invalidSymbols);
  await expect(await servicesPage.getValueInputField()).toContain('');

  const randomText = await textHelper.generateRandomText();
  await servicesPage.fillSymbols(randomText + 1);
  await expect((await servicesPage.getValueInputField()).length).toEqual(100);

  await servicesPage.fillSymbols('Б');
  await expect(await servicesPage.dropDownServicesBody).toBeVisible();

  await servicesPage.fillSymbols('буріння');
  const smallSymbols = await servicesPage.getTextDropDownServices(0);
  await servicesPage.fillSymbols('БУРІННЯ');
  const bigSymbols = await servicesPage.getTextDropDownServices(0);
  await expect(smallSymbols).toEqual(bigSymbols);

  const firstVariant = await servicesPage.getTextDropDownServices(0);
  await servicesPage.clickOnDropDownServices(0);
  const chosenVariant = await servicesPage.getTextChosenService();
  await expect(firstVariant).toContain(chosenVariant);
  await expect(servicesPage.removeServiceButton).toBeVisible();
  await servicesPage.clickOnRemoveServiceButton();
  await expect(servicesPage.removeServiceButton).not.toBeVisible();
});
