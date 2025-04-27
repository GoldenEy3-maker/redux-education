import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "@/shared/api/api-slice";
import { authSlice } from "@/shared/auth/slice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});
