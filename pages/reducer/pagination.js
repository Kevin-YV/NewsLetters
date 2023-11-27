import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    page: 1,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    goToPage(state, action) {
      state.value.page = action.payload;
    },
  },
});

export const { goToPage } = searchSlice.actions;
export default searchSlice.reducer;
