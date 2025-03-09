import { createSelector } from "@reduxjs/toolkit";
import { postsApiSlice } from "./posts-slice";

export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

export const selectPosts = createSelector(
  selectPostsResult,
  (postsResult) => postsResult?.data || [],
);
