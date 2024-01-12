import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [
      {
        username: "dummy",
        email: "dummy@gmail.com",
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const filteredUsers = state.users.filter(
        (user) => user.username !== action.payload.username
      );
      state.users = filteredUsers;
    },
    clearAllUsers: (state) => {
      state.users = [];
    },
  },
});

export const { addUser, removeUser, clearAllUsers } = userSlice.actions;

export default userSlice.reducer;
