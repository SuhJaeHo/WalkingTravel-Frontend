import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    placeName: "Location Search",
    region: {},
    distance: 0,
    photoURL: "",
  },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
  },
});

export const { updateDestination } = destinationSlice.actions;

export default destinationSlice.reducer;
