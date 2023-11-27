import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      name: "Kevin",
      username: "vinku",
      password: "180518",
      isLoggedin: false,
      bookmarks: [],
      likes: [],
    },
    {
      name: "Pedro",
      username: "pedrofmf",
      password: "06102000",
      isLoggedin: false,
      bookmarks: [],
      likes: [],
    },
  ],
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    createAccount(state, action) {
      state.value = [...state.value, action.payload];
    },

    deleteAccount(state, action) {
      state.value = state.value.filter((el) => el.username !== action.payload);
    },

    login(state, action) {
      // Checks if the username AND the password matches to any of the ones stored, then toggles isLoggedin from the concerned account to true
      state.value = state.value.map((el) => {
        if (
          action.payload.username === el.username &&
          action.payload.password === el.password
        ) {
          el.isLoggedin = true;
          return el;
        } else return el;
      });
    },

    logout(state) {
      // Sets every isLoggedin to false, just in case
      state.value = state.value.map((el) => {
        el.isLoggedin = false;
        return el;
      });
    },
    addBookmark(state, action) {
      // Checks if the name matches, then adds the payload to the bookmarks of the concerned account
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.bookmarks = [...el.bookmarks, action.payload.bookmarks];
          return el;
        } else return el;
      });
    },
    removeBookmark(state, action) {
      // Checks if the name matches, then filters the payload from the bookmarks of the concerned account
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.bookmarks = el.bookmarks.filter(
            (ele) => ele.title !== action.payload.bookmarks.title
          );
          return el;
        } else return el;
      });
    },
    clearBookmarks(state, action) {
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.bookmarks = [];
        }
      });
    },
    addLikes(state, action) {
      // Checks if the name matches, then adds the payload to the likes of the concerned account
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.likes = [...el.likes, action.payload.likes];
          return el;
        } else return el;
      });
    },
    removeLikes(state, action) {
      // Checks if the name matches, then filters the payload to the likes of the concerned account
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.likes = el.likes.filter(
            (ele) => ele.title !== action.payload.likes.title
          );
          return el;
        } else return el;
      });
    },
    clearLikes(state, action) {
      state.value = state.value.map((el) => {
        if (action.payload.name === el.name) {
          el.likes = [];
        }
      });
    },
  },
});

export const {
  login,
  createAccount,
  deleteAccount,
  logout,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  addLikes,
  removeLikes,
  clearLikes,
} = accountsSlice.actions;
export default accountsSlice.reducer;
