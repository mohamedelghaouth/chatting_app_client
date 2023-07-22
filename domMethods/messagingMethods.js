/** @format */
import { _userName, socket, selectedUser, thisUser } from "../store.js";
import { sendingMsg } from "../messagingUtils.js";
import { saveMyMsg } from "../localStorage.js";
import { getUserBySocketID } from "../usersUtils.js";

export function addMessage(msg) {
  let div = document.querySelector(".messages__history");
  if (msg.sender === thisUser[0]) {
    div.innerHTML += `
        <div class="outgoing__message">
              <div class="sent__message">
                <p>${msg.value}</p>
                <hr>
                <div class="message__info">
                  <span class="time_date">${msg.date}</span>
                </div>
              </div>
            </div>
      `;
  } else {
    div.innerHTML += `
         <div class="incoming__message">
              <div class="received__message">
                <p>${msg.value}</p>
                <hr>
                <div class="message__info">
                  <span class="message__author">${
                    getUserBySocketID(msg.sender)[1]
                  }</span>
                  <span class="time_date">${msg.date}</span>
                </div>
              </div>
            </div>
        `;
  }
}

export function addIsTyping(sender) {
  if (
    selectedUser != null &&
    selectedUser[0] === sender[0] &&
    selectedUser[1] === sender[1]
  ) {
    document.querySelector("#typing").innerHTML = `${sender[1]} is typing`;
  }
}

export function cleaningSpanText() {
  if (selectedUser != null) {
    document.querySelector("#typing").innerHTML = "";
  }
}

export function typingHandler(e) {
  socket.emit("is typing", selectedUser[0]);
}

export function blurHandler(e) {
  socket.emit("stopped typing", selectedUser[0]);
}
export function cleanMessageHistory() {
  document.querySelector(".messages__history").innerHTML = "";
}

export function updateMessageHistory(msgs) {
  cleanMessageHistory();
  msgs.forEach((msg) => {
    addMessage(msg);
  });
}

export function submitHandler(e) {
  e.preventDefault();
  let msg = {
    value: document.querySelector(".message_form__input").value,
    sender: thisUser[0],
    date: new Date(Date.now()).toUTCString(),
    to: selectedUser[0],
  };
  let msgs = saveMyMsg(msg);
  updateMessageHistory(msgs);
  sendingMsg(msg);
  document.querySelector(".message_form__input").value = "";
}
