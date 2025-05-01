import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_TAGS_MAP } from "../constants/api-tags";
import { getSession, signOut } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.accessToken)
      headers.set("Authorization", `Bearer ${session.accessToken}`);
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
    try {
      // Try to repeat the request with session refresh rotation
      result = await baseQuery(args, api, extraOptions);

      if (
        result.error?.status === "PARSING_ERROR" &&
        result.error.originalStatus === 401
      )
        signOut({ redirect: true });
    } catch (error) {
      console.error(error);
      signOut({ redirect: true });
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
