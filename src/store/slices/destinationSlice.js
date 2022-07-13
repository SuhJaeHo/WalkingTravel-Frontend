import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    placeName: "Location Search",
    region: {},
    distance: 0,
    photoURL: "",
    points: [],
    routes: [],
    bearings: [],
    isNear: false,
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
      const { points, routes, bearings } = action.payload;

      state.destination.points = points;
      state.destination.routes = routes;
      state.destination.bearings = bearings;
      state.destination.isGuideStart = true;
    },
    endGuide(state) {
      state.destination.isGuideStart = false;
    },
    updatePoint(state) {
      state.destination.points.shift();
      state.destination.isNear = false;
    },
    updateNearStatus(state) {
      state.destination.isNear = true;
    },
  },
});

export const { updateDestination, startGuide, endGuide, updatePoint, updateNearStatus } = destinationSlice.actions;

export default destinationSlice.reducer;
