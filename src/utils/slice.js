import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uislice",
  initialState: {
    scrollPosition: 0,
    geoLocation: {
      lattitude: 0,
      longitude: 0,
    },
  },
  reducers: {
    updatePosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    updateGeolocation: (state, action) => {
      state.geoLocation = action.payload;
    },
  },
});

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

export const { updatePosition, updateGeolocation } = uiSlice.actions;

export const reducers = {
  ui: uiSlice.reducer,
  user: userSlice.reducer,
};
