import { counterSlice } from "@/features/counter";
import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "@/shared/api/api-slice";

export const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
