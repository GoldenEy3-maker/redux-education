import { Session } from "./types";
import { apiSlice } from "../api/api-slice";

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
      invalidatesTags: ["Session"],
    }),
    register: builder.mutation<void, { email: string; password: string }>({
      query: (args) => ({
        url: "/user/register",
        method: "POST",
        body: args,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),
    session: builder.query<Session, void>({
      query: () => "/user/session",
      providesTags: ["Session"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSessionQuery,
  useRegisterMutation,
} = authApiSlice;
