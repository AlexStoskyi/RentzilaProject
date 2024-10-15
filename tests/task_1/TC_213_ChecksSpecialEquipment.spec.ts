import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/productsPage';
import { MainPage } from '../../pages/mainPage';
import { SpecialEquipPage } from '../../pages/specialEquipPage';
import url from '../../helper/endpoints.json';
import { expectUrl } from '../../helper/testCreds';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('TC_213_Checking ""Спецтехніка"" section on the main page', async ({
  page,
}) => {
  const productPage = new ProductPage(page);
  const mainPage = new MainPage(page);
  const specialEquipPage = new SpecialEquipPage(page);

  await specialEquipPage.scrollToSpecialEquipSection();

  expect(await specialEquipPage.isPopularTabVisible()).toBe(true);
  const countServiceCategories =
    await specialEquipPage.getSpecialEquipTabsCount();
  expect(countServiceCategories).toBeGreaterThan(0);

  for (let i = 0; i < countServiceCategories; i++) {
    await specialEquipPage.clickSpecialEquipTabByIndex(i);
    expect(await productPage.mapIsVisible());
    const amountOfServices = await specialEquipPage.getSpecialEquipCount();
    expect(amountOfServices).toBeGreaterThan(0);

    for (let j = 0; j < amountOfServices; j++) {
      await specialEquipPage.clickSpecialEquipmentByIndex(j);
      await page.waitForTimeout(1000);
      const currentUrl = await page.url();
      const relevantUnits = expectUrl;
      expect(relevantUnits).toContain(currentUrl?.trim());

      const activeCheckboxCount = await productPage.getFiltersCount();
      expect(activeCheckboxCount).toBe(1);

      await mainPage.clickLogo();
      await expect(page).toHaveURL(url.home_page);

      await specialEquipPage.scrollToSpecialEquipSection();
    }
  }
});
