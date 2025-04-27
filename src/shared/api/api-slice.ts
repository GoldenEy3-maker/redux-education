import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { authSchema, setToken } from "../auth/slice";
import { API_TAGS_MAP } from "../constants/api-tags";

const EXCLUDED_ROUTES = [
  "/user/session/refresh",
  "/user/login",
  "/user/register",
];

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

  if (EXCLUDED_ROUTES.includes(result.meta?.request.url ?? "")) {
    return result;
  }

  if (
    result?.error?.status === "PARSING_ERROR" &&
    result.error.originalStatus === 401
  ) {
    const refreshResult = await baseQuery(
      "/user/session/refresh",
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
        api.dispatch(setToken(null));
      }
    } else {
      api.dispatch(setToken(null));
    }
  }

  return result;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: Object.values(API_TAGS_MAP),
  endpoints: () => ({}),
});
