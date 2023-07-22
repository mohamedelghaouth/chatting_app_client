/** @format */
import {
  userList,
  inPrivateChat,
  selectedUser,
  selectedRoom,
} from "./store.js";

export function getActiveUser(userName) {
  for (let user of userList) {
    if (user[1] === userName) {
      return user;
    }
  }
  return null;
}

export function getTitle() {
  if (inPrivateChat) {
    return `texting ${selectedUser[1]}`;
  } else {
    return `texting ${selectedRoom.name}`;
  }
}
