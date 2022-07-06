import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../slices/userSlice";
import destination from "../slices/destinationSlice";
import sheet from "../slices/sheetSlice";

const rootReducer = combineReducers({
  user,
  destination,
  sheet,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
