/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    atlasFix(app: string): void;
    clickButton(name: RegExp | string): void;
    login({ email, password }: { email: string; password: string }): void;
    selectOption(
      dataQa: string,
      optionText: RegExp | string,
      customTimeout?: number
    ): void;
    selectOptionByLabel(option: RegExp | string, label: string): void;
    typeInInput(label: string | RegExp, textToType: string, required?: boolean): void;
  }
}
