import { BasePage } from './page';
import { Page } from '@playwright/test';

export class LoginPopUpPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  get popUp() {
    return this.page.locator('div[class*=Authorization_container]');
  }

  get emailField() {
    return this.page.locator('#email');
  }

  get passwordField() {
    return this.page.locator('#password');
  }

  get submitButton() {
    return this.page.locator('[class*= ItemButtons_darkBlueRoundBtn]').first();
  }

  get emailErrorMessage() {
    return this.page.locator(
      '//form[starts-with(@class,"LoginForm_form")]/div/p'
    );
  }

  get passwordErrorMessage() {
    return this.page.locator(
      '//form[starts-with(@class,"LoginForm_form")]/div[2]/div/p'
    );
  }

  get hidePasswordButton() {
    return this.page.getByTestId('reactHookButton');
  }

  get invalidEmailOrPasswordMessage() {
    return this.page.getByTestId('errorMessage');
  }

  get closeLoginPopUpButton() {
    return this.page.getByTestId('authClose');
  }

  async getEmailField() {
    await super.getElement('#email');
  }

  async login(login: string, password: string) {
    await this.emailField.isVisible();
    await super.fillData(this.emailField, login);
    await super.fillData(this.passwordField, password);
  }

  async clickSubmitButton(): Promise<void> {
    await super.clickElement(this.submitButton);
  }

  async clickHidePasswordButton(): Promise<void> {
    await super.clickElement(this.hidePasswordButton);
  }
}
