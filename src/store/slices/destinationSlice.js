import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    placeName: "Location Search",
    region: {},
    distance: 0,
    photoURL: "",
    points: [],
    routes: [],
    isGuideStart: false,
  },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
    startGuide(state, action) {
      const { points, routes } = action.payload;

      state.destination.points = points;
      state.destination.routes = routes;
      state.destination.isGuideStart = true;
    },
  },
});

export const { updateDestination, startGuide } = destinationSlice.actions;

export default destinationSlice.reducer;
