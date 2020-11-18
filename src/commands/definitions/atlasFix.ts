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

function onMessage(message: MessageEvent) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const that: Window = this;

  // Try to get the iframe where the app is
  const frame = that.document.querySelector("iframe.aut-iframe") as HTMLIFrameElement;

  if (!frame) {
    throw new Error("Could not find atlas application");
  }

  // Receive a message from the app that is hosted in atlas
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

export default () => {
  window.top.addEventListener("message", onMessage);
};
