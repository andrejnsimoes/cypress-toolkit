/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login({ email, password }: { email: string; password: string }): void;
    atlasFix(app: string): void;
  }
}
