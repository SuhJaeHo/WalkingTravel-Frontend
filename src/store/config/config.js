import { combineReducers, configureStore } from "@reduxjs/toolkit";
import region from "../slices/regionSlice";

const rootReducer = combineReducers({
  region,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
