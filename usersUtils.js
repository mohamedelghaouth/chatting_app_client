/** @format */
import { userList } from "./store.js";

export function getUserBySocketID(socketId) {
  for (const user of userList) {
    if (user[0] === socketId) {
      return user;
    }
  }
  return null;
}

export function getUserByUserName(userName) {
  for (const user of userList) {
    if (user[1] === userName) {
      return user;
    }
  }
  return null;
}
