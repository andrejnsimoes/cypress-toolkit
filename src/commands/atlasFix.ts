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

export default Cypress.Commands.add("atlasFix", (appId: string) => {
  if (!appId) {
    throw new Error("atlasFix - Define the application ID");
  }

  function onMessage(message: MessageEvent) {
    // Receive a message from the app that is hosted in atlas
    const frame = window.parent.document.querySelector(
      `iframe[id*='${appId}']`
    ) as HTMLIFrameElement;

    if (!frame) {
      throw new Error(`Could not find ${appId} application`);
    }

    const {
      data: { jsonrpc, nonce },
    } = message;

    // And redirect it to atlas! \o/
    frame?.contentWindow?.postMessage(
      { jsonrpc, nonce },
      frame.contentWindow.document.referrer,
      [...message.ports]
    );
  }

  window.parent.window.addEventListener("message", onMessage);
});
