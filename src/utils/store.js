import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./slice";

export const store = configureStore({
  reducer: {
    user: reducers.user,
    ui: reducers.ui,
    loggedInUser: reducers.loggedInUser,
    searchUsers: reducers.searchUsers,
  },
});
