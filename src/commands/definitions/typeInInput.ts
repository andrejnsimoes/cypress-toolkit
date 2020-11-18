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

import exactText from "../../strings/exactText";

export default (label: string | RegExp, textToType: string, required = false) => {
  cy.iframe()
    .contains(required ? exactText(`${label}*`) : label)
    .parent()
    .find("input")
    .type(textToType);
};
