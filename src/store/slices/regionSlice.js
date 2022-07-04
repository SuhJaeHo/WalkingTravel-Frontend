import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: {
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    updateRegion(state, action) {
      state.region = action.payload;
    },
  },
});

export const { updateRegion } = regionSlice.actions;

export default regionSlice.reducer;
