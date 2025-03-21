import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { apiSlice } from "../../shared/api/api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .prepend()
        .concat(apiSlice.middleware),
  });

  setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof configureAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
