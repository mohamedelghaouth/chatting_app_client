/** @format */
import {
  cleanUserListUsersList,
  updateUserList,
} from "../domMethods/usersMethods.js";

import { setUserList, socket } from "../store.js";

socket.on("update Users", function (activeUsers) {
  setUserList(activeUsers);
  cleanUserListUsersList();
  updateUserList(activeUsers);
});
