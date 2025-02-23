import { counterSlice } from "@/features/counter";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
});
