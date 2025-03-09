declare global {
  declare type AppStore = import("../src/app/store").AppStore;
  declare type RootState = import("../src/app/store").RootState;
  declare type AppDispatch = import("../src/app/store").AppDispatch;
  declare type AppThunk = import("../src/app/store").AppThunk;
}

export {};
