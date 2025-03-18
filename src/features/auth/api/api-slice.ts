import { Session } from "../../../shared/model/types";
import { apiSlice } from "../../../shared/api/api-slice";

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
  }),
});

export const { useLoginMutation } = authApiSlice;
