import { Session } from "@/features/auth/model/types";
import { apiSlice } from "@/shared/api/api-slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: Session },
      { email: string; password: string }
    >({
      query: (args) => ({
        url: "/user/login",
        method: "POST",
        body: args,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    session: builder.query<Session, void>({
      query: () => "/user/session",
      providesTags: ["Session"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSessionQuery } =
  authApiSlice;
