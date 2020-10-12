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

import { parse } from "url";

type UserLogin = {
  email: string;
  password: string;
};

// Kudos to @nuno.rosa for the code that retrieves the code via Regex!
const csrfTokenRegexp = /token:\s+'([a-z0-9-]+)'/i;

const extractCsrfToken = (response: Cypress.Response) => {
  const tokenRegexpMatch = csrfTokenRegexp.exec(response.body);

  if (tokenRegexpMatch) {
    return tokenRegexpMatch[1];
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(response.body, "text/html");
  const crsfSelector = doc.querySelector(
    "meta[name='_csrf'"
  ) as HTMLMetaElement;
  const token = crsfSelector?.content;

  if (!token) {
    throw new Error("Could not find the _csrf token on Talkdesk ID response.");
  }

  return token;
};

const extractFinalRequestUrl = (response: Cypress.Response) =>
  response.allRequestResponses[response.allRequestResponses.length - 1][
    "Request URL"
  ];

const buildAuthenticationUrl = (baseUrl: string) => {
  const requestUrl = parse(baseUrl);
  return `${requestUrl.protocol}//${requestUrl.host}/authenticate`;
};

const loginWithCsrf = (
  authUrl: string,
  email: string,
  password: string,
  csrfToken: string
) =>
  cy.request({
    method: "POST",
    url: authUrl,
    failOnStatusCode: false,
    followRedirect: true,
    form: true,
    body: {
      username: email,
      password,
      _csrf: csrfToken,
    },
  });

const login = (user: UserLogin) => {
  const url = "/";
  cy.request({
    url,
    followRedirect: true,
    failOnStatusCode: false,
    headers: { accept: "text/html" },
  }).then((response) => {
    const csrfToken = extractCsrfToken(response);
    const requestUrl = buildAuthenticationUrl(extractFinalRequestUrl(response));

    loginWithCsrf(requestUrl, user.email, user.password, csrfToken);
  });
};

export default Cypress.Commands.add("login", login);
