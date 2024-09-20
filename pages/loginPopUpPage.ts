import { Page } from '@playwright/test';

export class LoginPopUpPage {
  constructor(private page: Page) {}

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
    return this.page.locator(
      '//div[starts-with(@class, "Authorization_container")]//div[starts-with(@class, "ItemButtons_wrapper")]'
    );
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

  get hidePasswordButton(){
    return this.page.locator('//div[@data-testid="reactHookButton"]');
  }

  get invalidEmailOrPasswordMessage(){
    return this.page.locator('//div[@data-testid="errorMessage"]');
  }

  get closeLoginPopUpButton(){
    return this.page.locator('//div[@data-testid="authClose"]')
  }
  
  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async isPasswordVisible(): Promise<boolean> {
    return this.page.evaluate(() => {
      const passwordField = document.querySelector('#password') as HTMLInputElement;
      return passwordField && passwordField.type === 'text';
    });
  }

  async isPasswordHidden(): Promise<boolean> {
    return this.page.evaluate(() => {
      const passwordField = document.querySelector('#password') as HTMLInputElement;
      return passwordField && passwordField.type === 'password';
    });
  }
}
