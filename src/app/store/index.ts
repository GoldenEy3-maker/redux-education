import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

export function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
}

export type AppStore = ReturnType<typeof configureAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
