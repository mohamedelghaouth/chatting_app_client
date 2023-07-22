/** @format */

import { getActiveUser, getTitle } from "../utils.js";
import {
  submitHandler,
  typingHandler,
  blurHandler,
  updateMessageHistory,
} from "./messagingMethods.js";
import { getMsgsOf } from "../localStorage.js";

import {
  _userName,
  setSelectedUser,
  setInPrivateChat,
  setThisUser,
} from "../store.js";

import { getUserBySocketID, getUserByUserName } from "../usersUtils.js";

export function addCurrentUser(userName) {
  let div = document.querySelector(".current_user");
  const userBox = `
    <div class="chat_ib ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
  div.innerHTML += userBox;
}

export function addUserToUsersList(userName) {
  let div = document.querySelector(".user_list");
  const userBox = `
    <div class="chat_ib ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
  div.innerHTML += userBox;
}

export function cleanUserListUsersList() {
  let div = document.querySelector(".user_list");
  div.innerHTML = `
    <div class="current_user"></div>
  `;
}

export function updateUserList(activeUsers) {
  activeUsers.forEach((element) => {
    if (element[1] === _userName) {
      setThisUser(element);
      addCurrentUser(element[1]);
    } else {
      addUserToUsersList(element[1]);
    }
  });
}

export function selectUser(e) {
  let selectedElm = e.target.childNodes[0].data;
  if (selectedElm !== _userName) {
    setSelectedUser(getActiveUser(selectedElm));
    setInPrivateChat();
    updateMessagingSection();
    updateMessageHistory(getMsgsOf(getUserByUserName(selectedElm)[0]));
    updateSenderColorToDefault(selectedElm);
  }
}

export function updateMessagingSection() {
  let section = document.querySelector(".mainSection");
  section.innerHTML = `
    <h2 id="main_section_title">${getTitle()}</h2>
    <div class="inbox__messages">
      <div class="messages__history"></div>
      <div class="fallback"></div>
    </div>
    <div>
      <span id="typing"></span>
    </div>
    <div class="messageForm">
      <form class="message_form">
        <input
          type="text"
          class="message_form__input"
          placeholder="Type a message"
        />
        <button class="message_form__button" type="submit">Enter</button>
      </form>
    </div>
  `;

  document
    .querySelector(".message_form")
    .addEventListener("submit", submitHandler);

  document
    .querySelector(".message_form__input")
    .addEventListener("keydown", typingHandler);

  document
    .querySelector(".message_form__input")
    .addEventListener("blur", blurHandler);
}

export function updateSenderColor(sender) {
  let user = getUserBySocketID(sender);
  let div = document.querySelector(`.${user[1]}-userlist`);

  div.classList.add("has_unread_message");
}

export function updateSenderColorToDefault(userName) {
  let div = document.querySelector(`.${userName}-userlist`);

  div.classList.remove("has_unread_message");
}
