import { createSelector } from "@reduxjs/toolkit";
import { initialState, postsAdapter, postsApiSlice } from "./posts-slice";

const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (result) => result.data ?? initialState,
);

export const { selectAll: selectPosts } =
  postsAdapter.getSelectors(selectPostsData);
