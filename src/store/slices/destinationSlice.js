import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "장소 검색",
  region: {},
  photoURL: "",
  distance: 0,
  routes: [],
  conformedRoutes: [],
  conformedBearings: [],
  currentRouteIndex: 0,
  isGuideStart: false,
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    chooseDestination(state, action) {
      const { address, region, photoURL, distance } = action.payload;

      state.address = address;
      state.region = region;
      state.photoURL = photoURL;
      state.distance = distance;
      state.isGuideStart = false;
    },
    startGuide(state, action) {
      const { routes, conformedRoutes, conformedBearings } = action.payload;

      state.routes = routes;
      state.conformedRoutes = conformedRoutes;
      state.conformedBearings = conformedBearings;
      state.isGuideStart = true;
    },
    endGuide(state) {
      state.isGuideStart = false;
    },
    updateCurrentRouteIndex(state, action) {
      state.currentRouteIndex = action.payload;
    },
  },
});

export const { chooseDestination, startGuide, endGuide, updateCurrentRouteIndex } = destinationSlice.actions;

export default destinationSlice.reducer;
