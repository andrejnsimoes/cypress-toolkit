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

import * as commandDefinitions from "./definitions";

export default () => {
  Cypress.Commands.add("atlasFix", commandDefinitions.atlasFix);
  Cypress.Commands.add("clickButton", commandDefinitions.clickButton);
  Cypress.Commands.add("login", commandDefinitions.login);
  Cypress.Commands.add("logout", commandDefinitions.logout);
  Cypress.Commands.add("selectOption", commandDefinitions.selectOption);
  Cypress.Commands.add("selectOptionByLabel", commandDefinitions.selectOptionByLabel);
  Cypress.Commands.add("typeInInput", commandDefinitions.typeInInput);
};
