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
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clear: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { clear, setToken } = authSlice.actions;
