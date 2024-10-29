import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import expectText from '../../helper/expectText.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.create_unit);
});

test('Verify category (Категорія) section ', async ({ page }) => {
  test.setTimeout(60000);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();

  await expect(createUnitePage.mainInfoWrapper).toBeVisible();

  const categoryText = await createUnitePage.categoryTittle.innerText();
  await expect(categoryText).toContain('*');
  const categoryButtonText = await createUnitePage.categoryButton.innerText();
  await expect(categoryButtonText).toContain(expectText.chooseCategory);
  expect(createUnitePage.categoryArrow).toBeVisible();

  await createUnitePage.clickNextButton();
  await expect(createUnitePage.categoryErrorMessage).toContainText(
    expectText.obligatoryField
  );

  await createUnitePage.categoryButton.click();
  await expect(createUnitePage.categoryPopupWrapper).toBeVisible();
  const popUpTopText =
    await createUnitePage.categoryPopupWrapperTop.innerText();
  await expect(popUpTopText).toContain(expectText.technicalCategories);
  await createUnitePage.closePopUpButton.click();
  await expect(createUnitePage.categoryPopupWrapper).not.toBeVisible();

  await createUnitePage.categoryButton.click();
  await expect(createUnitePage.categoryPopupWrapper).toBeVisible();
  const boundingBox = await createUnitePage.categoryPopupWrapper.boundingBox();
  if (boundingBox) {
    const x = boundingBox.x + boundingBox.width + 10;
    const y = boundingBox.y + boundingBox.height / 2;
    await page.mouse.click(x, y);
  }
  await expect(createUnitePage.categoryPopupWrapper).not.toBeVisible();

  await createUnitePage.categoryButton.click();
  const firstCategoryList = await createUnitePage.firstCategoryList;
  const firstCategoryCount = await firstCategoryList.count();
  for (let i = 0; i < firstCategoryCount; i++) {
    const firstCategory = firstCategoryList.nth(i);

    await firstCategory.click();
    await expect(createUnitePage.secondCategoryListField).toBeVisible();

    const secondCategoryList = await createUnitePage.secondCategoryList;
    const secondCategoryCount = await secondCategoryList.count();

    for (let j = 0; j < secondCategoryCount; j++) {
      const secondCategory = secondCategoryList.nth(j);

      await secondCategory.click();
      await expect(createUnitePage.thirdCategoryListField).toBeVisible();

      const thirdCategoryList = await createUnitePage.thirdCategoryList;
      const thirdCategoryCount = await thirdCategoryList.count();

      for (let k = 0; k < thirdCategoryCount; k++) {
        const thirdCategory = thirdCategoryList.nth(k);

        await expect(thirdCategory).toBeVisible();

        const categoryText = await thirdCategory.textContent();

        await thirdCategory.click();

        await expect(createUnitePage.categoryPopupWrapper).toBeHidden();

        const innerTextCategoryButton =
          await createUnitePage.categoryButton.textContent();

        await expect(innerTextCategoryButton).toContain(categoryText);

        await createUnitePage.categoryButton.click();
      }
    }
  }
});
