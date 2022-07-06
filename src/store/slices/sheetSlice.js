import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBottomSheetOpen: false,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    updateSheetState(state) {
      state.isBottomSheetOpen = !state.isBottomSheetOpen;
    },
  },
});

export const { updateSheetState } = sheetSlice.actions;

export default sheetSlice.reducer;
