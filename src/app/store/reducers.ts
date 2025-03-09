import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "@/shared/api/api-slice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});
