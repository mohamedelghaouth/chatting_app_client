/** @format */
import { thisUser } from "./store.js";

function getOthersMsgsKey(msg) {
  return thisUser[0] + "_" + msg.sender;
}
function getMyMsgsKey(msg) {
  return thisUser[0] + "_" + msg.to;
}

function getMsgsKeyForSender(senderId) {
  return thisUser[0] + "_" + senderId;
}

export function saveUserMsg(key, msg) {
  let msgs = JSON.parse(localStorage.getItem(key));
  if (msgs == null) {
    msgs = [];
  }
  msgs.push(msg);
  localStorage.setItem(key, JSON.stringify(msgs));
  return msgs;
}

export function saveMyMsg(msg) {
  let key = getMyMsgsKey(msg);
  return saveUserMsg(key, msg);
}

export function saveOthersMsg(msg) {
  let key = getOthersMsgsKey(msg);
  return saveUserMsg(key, msg);
}

export function getMsgsOf(userSocketId) {
  let msgs = JSON.parse(
    localStorage.getItem(getMsgsKeyForSender(userSocketId))
  );
  if (msgs == null) {
    return [];
  }
  return msgs;
}
