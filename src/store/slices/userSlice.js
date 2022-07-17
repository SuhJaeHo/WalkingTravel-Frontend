import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  currentRegion: {
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
  beforeRegion: {
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
  placeName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUid(state, action) {
      state.uid = action.payload;
    },
    updateCurrentPoint(state, action) {
      const { currentRegion, placeName } = action.payload;

      state.beforeRegion = state.currentRegion;

      state.currentRegion = currentRegion;
      state.placeName = placeName;
    },
  },
});

export const { addUid, updateCurrentPoint } = userSlice.actions;

export default userSlice.reducer;
