import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomSheetOpen: false,
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    updateSheetState(state) {
      state.isBottomSheetOpen = !state.isBottomSheetOpen;
    },
  },
});

export const { updateSheetState } = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
