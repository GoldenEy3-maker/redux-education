import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

type AuthState = {
  token: string | null;
};

export const authSchema = z.custom<AuthState>();

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
