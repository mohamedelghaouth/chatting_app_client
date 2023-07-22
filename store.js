/** @format */
export let thisUser;
export let _userName;
export let userList;
export let selectedUser;
export let selectedRoom;
export let socket = io("ws://localhost:3000");
export let inRoom = false;
export let inPrivateChat = false;

export function setUserName(userName) {
  _userName = userName;
}

export function setSelectedUser(_selectedUser) {
  selectedUser = _selectedUser;
}

export function setSelectedRoom(_selectedRoom) {
  selectedUser = _selectedRoom;
}

export function setUserList(_userList) {
  userList = _userList;
}

export function setThisUser(_thisUser) {
  thisUser = _thisUser;
}

export function setInRoom() {
  inRoom = true;
  inPrivateChat = false;
}

export function setInPrivateChat() {
  inPrivateChat = true;
  inRoom = false;
}
