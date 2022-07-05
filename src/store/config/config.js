import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../slices/userSlice";
import destination from "../slices/destinationSlice";

const rootReducer = combineReducers({
  user,
  destination,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
