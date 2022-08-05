import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  currentRegion: {
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
  compassHeading: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUid(state, action) {
      state.uid = action.payload;
    },
    trackCurrentRegion(state, action) {
      const { currentRegion } = action.payload;

      state.currentRegion = currentRegion;
    },
    trackCompassHeading(state, action) {
      state.compassHeading = action.payload;
    },
  },
});

export const { addUid, trackCurrentRegion, trackCompassHeading } = userSlice.actions;

export default userSlice.reducer;
