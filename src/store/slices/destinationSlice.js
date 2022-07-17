import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    placeName: "Location Search",
    region: {},
    distance: 0,
    photoURL: "",
    routes: [],
    bearings: [],
    currentPointIndex: 0,
    isGuideStart: false,
  },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    updateDestination(state, action) {
      const { placeName, region, photoURL, distance } = action.payload;

      state.destination.placeName = placeName;
      state.destination.region = region;
      state.destination.photoURL = photoURL;
      state.destination.distance = distance;
    },
    startGuide(state, action) {
      const { routes, bearings } = action.payload;

      state.destination.routes = routes;
      state.destination.bearings = bearings;
      state.destination.isGuideStart = true;
    },
    endGuide(state) {
      state.destination.isGuideStart = false;
    },
    updateCurrentPointIndex(state, action) {
      state.destination.currentPointIndex = action.payload;
    },
  },
});

export const { updateDestination, startGuide, endGuide, updateCurrentPointIndex } = destinationSlice.actions;

export default destinationSlice.reducer;
