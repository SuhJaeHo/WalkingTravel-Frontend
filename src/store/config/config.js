import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../slices/userSlice";
import destination from "../slices/destinationSlice";
import bottomSheet from "../slices/bottomSheetSlice";

const rootReducer = combineReducers({
  user,
  destination,
  bottomSheet,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
