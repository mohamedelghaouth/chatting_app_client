/** @format */
import {
  typingHandler,
  blurHandler,
  submitHandler,
} from "./domMethods/messagingMethods.js";

import { selectUser, addUserToUsersList } from "./domMethods/usersMethods.js";
import { setUserName, socket } from "./store.js";
import "./socketsEvents/msgEvent.js";
import "./socketsEvents/usersEvent.js";

document.querySelector(".user_list").addEventListener("click", selectUser);

function newUser() {
  function randomNumber() {
    return Math.floor(Math.random() * 10000);
  }
  let userName = `user_${randomNumber()}`;
  setUserName(userName);
  socket.emit("new User", userName);
  addUserToUsersList(userName);
}

newUser();
