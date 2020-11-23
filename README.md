# Cypress toolkit

Contains commands and helpers to aid to develop Cypress E2E tests with Atlas

## Installation

Add a .npmrc file to your project. Define the following registry for the @talkdesk-tdx scope:

```
@talkdesk:registry=https://npm.pkg.github.com/
```

And then install the package running:

```bash
npm install @talkdesk-tdx/cypress-toolkit --save
# or with yarn
yarn add @talkdesk-tdx/cypress-toolkit
```

Finally, import the library in the commands/index.js file:

```js
import "@talkdesk-tdx/cypress-toolkit";
```

## Commands

#### [](https://github.com/talkdesk-tdx/guide-ui/blob/master/readme.md#yarn-docker)`cy.atlasFix()` - Invoke this command before any unit test to start performing unit tests with atlas.

#### [](https://github.com/talkdesk-tdx/guide-ui/blob/master/readme.md#yarn-docker)`cy.login(<>)` - In order to perform the authentication with Talkdesk's API gateway.

#### [](https://github.com/talkdesk-tdx/guide-ui/blob/master/readme.md#yarn-docker)`cy.logout(<>)` - In order to logout of the application using the UI components.
