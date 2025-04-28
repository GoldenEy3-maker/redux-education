import { Session } from "./types";
import { apiSlice } from "../api/api-slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: Session },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: "/login",
        method: "POST",
        body: args,
      }),
    }),
    register: builder.mutation<void, { email: string; password: string }>({
      query: (args) => ({
        url: "/register",
        method: "POST",
        body: args,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApiSlice;
