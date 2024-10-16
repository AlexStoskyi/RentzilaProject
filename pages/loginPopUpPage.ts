import { Locator, Page } from '@playwright/test';
import { BasePage } from './page';

export class LoginPopUpPage extends BasePage {

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

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async clickSubmitButton(): Promise<void> {
      await super.clickElement(this.submitButton);
  }

  async clickHidePasswordButton(): Promise<void> {
      await super.clickElement(this.hidePasswordButton);
  }
}
