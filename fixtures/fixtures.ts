import { BasePage } from './../pages/page';
import { MainPage } from '../pages/mainPage';
import { test as base } from '@playwright/test';
import { ProductPage } from '../pages/productsPage';
import { UnitPage } from '../pages/unitPage';
import { SpecialEquipPage } from '../pages/specialEquipPage';
import { ServicePage } from '../pages/servicePage';
import { QuestionsPage } from '../pages/questionsFormPage';
import { LoginPopUpPage } from '../pages/loginPopUpPage';
import { FooterPage } from '../pages/footerPage';
import { PhotoPage } from '../pages/createUnitePhotoPage';
import { CreateUnitPage } from '../pages/createUnitePage';
import { CreateUnitServicesPage } from '../pages/createUniteServicesPage';

export type MyFixtures = {
  mainPage: MainPage;
  productPage: ProductPage;
  unitPage: UnitPage;
  specialEquipPage: SpecialEquipPage;
  servicePage: ServicePage;
  questionsFormPage: QuestionsPage;
  loginPopUpPage: LoginPopUpPage;
  footerPage: FooterPage;
  photoPage: PhotoPage;
  createUnitePage: CreateUnitPage;
  createUniteServicesPage: CreateUnitServicesPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  unitPage: async ({ page }, use) => {
    await use(new UnitPage(page));
  },

  specialEquipPage: async ({ page }, use) => {
    await use(new SpecialEquipPage(page));
  },

  servicePage: async ({ page }, use) => {
    await use(new ServicePage(page));
  },

  questionsFormPage: async ({ page }, use) => {
    await use(new QuestionsPage(page));
  },

  loginPopUpPage: async ({ page }, use) => {
    await use(new LoginPopUpPage(page));
  },

  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
  },

  photoPage: async ({ page }, use) => {
    await use(new PhotoPage(page));
  },

  createUnitePage: async ({ page }, use) => {
    await use(new CreateUnitPage(page));
  },

  createUniteServicesPage: async ({ page}, use) => {
    await use(new CreateUnitServicesPage(page));
  }
});
