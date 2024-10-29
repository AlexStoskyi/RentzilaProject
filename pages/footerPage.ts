import { expect } from '@playwright/test';
import { BasePage } from './page';

export class FooterPage extends BasePage {
  get privacyPolicyBody() {
    return this.page.locator('[class*=PrivacyPolicy_container]');
  }

  get cookiesContainerBody() {
    return this.page.locator('[class*=Cookies_container]');
  }

  get userAgreementBody() {
    return this.page.locator('[class*=TermsConditions_content]');
  }

  get footer() {
    return this.page.locator('//div[starts-with(@class, "Footer_footer")]');
  }

  get aboutUsField() {
    return this.page.getByTestId('content');
  }

  get privacyPolicyField() {
    return this.page.getByTestId('politika-konfidenciinosti');
  }

  get cookieRulesField() {
    return this.page.getByTestId('pravila-vikoristannya-failiv-cookie');
  }

  get termsField() {
    return this.page.getByTestId('umovi-dostupu-ta-koristuvannya');
  }

  get userField() {
    return this.page.locator('[class*=RentzilaForBuyers_title]');
  }

  get announcementField() {
    return this.page.locator(
      '//div[starts-with (@class, "RentzilaForBuyers_link")]/a[@href="/products/"]'
    );
  }

  get tendersField() {
    return this.page.locator(
      '//div[starts-with (@class, "RentzilaForBuyers_link")]/a[@href="/tenders-map/"]'
    );
  }

  get jobRequestsField() {
    return this.page.locator(
      '//div[starts-with (@class, "RentzilaForBuyers_link")]/a[@href="/requests-map/"]'
    );
  }

  get contactsField() {
    return this.page.locator('[class*=RentzilaContacts_title]');
  }

  get emailField() {
    return this.page.locator('[class*=RentzilaContacts_container]');
  }

  get footerLogo() {
    return this.page.locator('[class*=Footer_footer] [data-testid*=logo]');
  }

  get rentzilaProtected() {
    return this.page.getByTestId('copyright');
  }

  async scrollIntoViewFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async checkAllElementsVisible(): Promise<void> {
    await Promise.all([
      await expect(this.footer).toBeVisible(),
      await expect(this.aboutUsField).toBeVisible(),
      await expect(this.privacyPolicyField).toBeVisible(),
      await expect(this.cookieRulesField).toBeVisible(),
      await expect(this.termsField).toBeVisible(),
      await expect(this.userField).toBeVisible(),
      await expect(this.announcementField).toBeVisible(),
      await expect(this.tendersField).toBeVisible(),
      await expect(this.jobRequestsField).toBeVisible(),
      await expect(this.contactsField).toBeVisible(),
      await expect(this.emailField).toBeVisible(),
      await expect(this.footerLogo).toBeVisible(),
      await expect(this.rentzilaProtected).toBeVisible(),
    ]);
  }

  async clickOnPrivacyPolicyField() {
    await this.privacyPolicyField.click();
  }

  async clickOnCookieRulesField() {
    await this.cookieRulesField.click();
  }

  async clickOnTermsField() {
    await this.termsField.click();
  }

  async clickOnAnnouncementField() {
    await this.announcementField.click();
  }

  async clickOnTendersField() {
    await this.tendersField.click();
  }

  async clickOnEmailField() {
    await this.emailField.click();
  }
}
