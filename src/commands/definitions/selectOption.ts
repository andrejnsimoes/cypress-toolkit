/*
 * Talkdesk Confidential
 *
 * Copyright (C) Talkdesk Inc. 2020
 *
 * The source code for this program is not published or otherwise divested
 * of its trade secrets, irrespective of what has been deposited with the
 * U.S. Copyright Office. Unauthorized copying of this file, via any medium
 * is strictly prohibited.
 */

/// <reference types="cypress" />
/// <reference types="cypress-iframe"/>
/// <reference types="@types/testing-library__cypress" />

export default (dataQa: string, optionText: RegExp | string, customTimeout?: number) => {
  cy.iframe()
    .findByTestId(dataQa, {
      timeout: customTimeout ?? Cypress.config("defaultCommandTimeout"),
    })
    .should("be.visible")
    .click()
    .contains(optionText)
    .click();
};
