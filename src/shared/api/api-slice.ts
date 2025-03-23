import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { authSchema, logOut, setToken } from "@/features/auth/model/slice";
import { ApiTagsMap } from "../constants/api-tags";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

async function baseQueryWithAuth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === "PARSING_ERROR" &&
    result.error.originalStatus === 401
  ) {
    const refreshResult = await baseQuery(
      "/session/refresh",
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      try {
        const { token } = authSchema.parse(refreshResult.data);
        api.dispatch(setToken(token));
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        console.error(error);
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: Object.values(ApiTagsMap),
  endpoints: () => ({}),
});
