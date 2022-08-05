import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomSheetOpen: false,
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    openBottomSheet(state) {
      state.isBottomSheetOpen = true;
    },
    closeBottomSheet(state) {
      state.isBottomSheetOpen = false;
    },
  },
});

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
