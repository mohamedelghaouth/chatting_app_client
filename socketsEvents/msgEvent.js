/** @format */

import {
  updateMessageHistory,
  addIsTyping,
  cleaningSpanText,
} from "../domMethods/messagingMethods.js";
import { updateSenderColor } from "../domMethods/usersMethods.js";

import { socket, selectedUser } from "../store.js";
import { saveOthersMsg } from "../localStorage.js";
import { getUserBySocketID } from "../usersUtils.js";

socket.on("new private msg", function (msg) {
  let msgs = saveOthersMsg(msg);
  if (selectedUser != undefined && selectedUser[0] == msg.sender) {
    updateMessageHistory(msgs);
  } else {
    updateSenderColor(msg.sender);
  }
});

socket.on("is typing", function (senderSocketId) {
  addIsTyping(getUserBySocketID(senderSocketId));
});

socket.on("stopped typing", function () {
  cleaningSpanText();
});
