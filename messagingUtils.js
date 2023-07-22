/** @format */

import { socket, inPrivateChat } from "./store.js";

export function sendingMsg(msg) {
  if (inPrivateChat) {
    socket.emit("new private msg", msg);
  } else {
  }
}
