import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  currentPosition: {
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUid(state, action) {
      state.uid = action.payload;
    },
    updateCurrentPosition(state, action) {
      state.currentPosition = action.payload;
    },
  },
});

export const { addUid, updateCurrentPosition } = userSlice.actions;

export default userSlice.reducer;
