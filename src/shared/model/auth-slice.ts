import type { Session } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";

type AuthState = {
  user: Session | null;
  token: string | null;
};

export const authSchema = z.custom<AuthState>();

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
