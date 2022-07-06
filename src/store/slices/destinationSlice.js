import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    placeName: "",
    region: {},
    distance: 0,
    photoURL: "",
  },
};

const regionSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
  },
});

export const { updateDestination } = regionSlice.actions;

export default regionSlice.reducer;
