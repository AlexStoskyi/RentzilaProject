import { Page } from '@playwright/test';

export class FooterLinks {
  constructor(private page: Page) {}

  get privacyPolicyBody() {
    return this.page.locator(
      '//div[starts-with(@class, "PrivacyPolicy_container")]'
    );
  }
  get cookiesContainerBody() {
    return this.page.locator('//div[starts-with(@class, "Cookies_container")]');
  }
  get userAgreementBody() {
    return this.page.locator(
      '//div[starts-with(@class, "TermsConditions_content")]'
    );
  }
}

export class FooterPage {
  constructor(private page: Page) {}

  get footer() {
    return this.page.locator('//div[starts-with(@class, "Footer_footer")]');
  }

  get aboutUsField() {
    return this.page.locator('//div[@data-testid="content"]');
  }
  get privacyPolicyField() {
    return this.page.locator('//div[@data-testid="politika-konfidenciinosti"]');
  }
  get cookieRulesField() {
    return this.page.locator(
      '//div[@data-testid="pravila-vikoristannya-failiv-cookie"]'
    );
  }
  get termsField() {
    return this.page.locator(
      '//div[@data-testid="umovi-dostupu-ta-koristuvannya"]'
    );
  }
  get userField() {
    return this.page.locator(
      '//div[starts-with(@class, "RentzilaForBuyers_container")]/div[starts-with(@class, "RentzilaForBuyers_title")]'
    );
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
    return this.page.locator(
      '//div[starts-with(@class,"RentzilaContacts_title")]'
    );
  }
  get emailField() {
    return this.page.locator(
      '//div[starts-with(@class,"RentzilaContacts_container")]'
    );
  }
  get footerLogo() {
    return this.page.locator(
      '//div[starts-with(@class,Footer_footer)]/div[@data-testid="logo"]'
    );
  }
  get rentzilaProtected() {
    return this.page.locator('//div[@data-testid="copyright"]');
  }

  async scrollIntoViewFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }
  async checkAllElementsVisible(): Promise<void> {
    await Promise.all([
      this.footer.waitFor({ state: 'visible' }),
      this.aboutUsField.waitFor({ state: 'visible' }),
      this.privacyPolicyField.waitFor({ state: 'visible' }),
      this.cookieRulesField.waitFor({ state: 'visible' }),
      this.termsField.waitFor({ state: 'visible' }),
      this.userField.waitFor({ state: 'visible' }),
      this.announcementField.waitFor({ state: 'visible' }),
      this.tendersField.waitFor({ state: 'visible' }),
      this.jobRequestsField.waitFor({ state: 'visible' }),
      this.contactsField.waitFor({ state: 'visible' }),
      this.emailField.waitFor({ state: 'visible' }),
      this.footerLogo.waitFor({ state: 'visible' }),
      this.rentzilaProtected.waitFor({ state: 'visible' }),
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
  async clickOnEmail() {
    await this.emailField.click();
  }
}
