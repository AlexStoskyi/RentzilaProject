import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { FooterPage } from '../../pages/footerPage';
import { FooterLinks } from '../../pages/footerPage';
import { ProductPage } from '../../pages/productsPage';
import url from '../../helper/url.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('TC_214_Verify that all elements on the footer are displayed and all links are clickable', async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  const footerPage = new FooterPage(page);
  const footerLinks = new FooterLinks(page);
  const productPage = new ProductPage(page);

  await footerPage.scrollIntoViewFooter();
  await footerPage.checkAllElementsVisible();

  await footerPage.clickOnPrivacyPolicyField();
  await expect(page).toHaveURL(url.privacy_policy);
  await expect(footerLinks.privacyPolicyBody).toBeVisible();

  await footerPage.scrollIntoViewFooter();
  await footerPage.clickOnCookieRulesField();
  await expect(page).toHaveURL(url.cooki_policy);
  await expect(footerLinks.cookiesContainerBody).toBeVisible();

  await footerPage.scrollIntoViewFooter();
  await footerPage.clickOnTermsField();
  await expect(footerLinks.userAgreementBody).toBeVisible();

  await footerPage.scrollIntoViewFooter();
  await footerPage.clickOnAnnouncementField();
  expect(await productPage.searchField).toBeVisible();
  const textSearchPlaceholder = await productPage.getTextSearchPlaceholder();
  expect(textSearchPlaceholder).toContain('Пошук оголошень або послуг');

  await mainPage.clickLogo();
  await footerPage.scrollIntoViewFooter();
  await footerPage.clickOnTendersField();
  await expect(page).toHaveURL(url.tender_url);

  expect(productPage.searchTenderField).toBeVisible();
  const textSearchTenderPlaceholder =
    await productPage.getTextSearchTenderPlaceholder();
  expect(textSearchTenderPlaceholder).toContain(
    'Пошук тендера за ключовими словами'
  );

  await mainPage.clickLogo();
  await footerPage.scrollIntoViewFooter();
  await footerPage.clickOnEmailField();
});
