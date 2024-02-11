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

const loggedInUserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      username: "",
      email: "",
      profileUrl: null,
      bio: null,
      coverUrl: null,
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = {};
    },
  },
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    users: [],
  },
  reducers: {
    assignUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
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
        profileUrl: null,
        bio: null,
        coverUrl: null,
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

export const { removeUser, clearAllUsers } = userSlice.actions;

export const { updatePosition, updateGeolocation } = uiSlice.actions;

export const { addUser, clearUser, updateUser } = loggedInUserSlice.actions;

export const { assignUsers, clearUsers } = searchSlice.actions;

export const reducers = {
  ui: uiSlice.reducer,
  user: userSlice.reducer,
  loggedInUser: loggedInUserSlice.reducer,
  searchUsers: searchSlice.reducer,
};
