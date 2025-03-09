"use client";

import { postsAdapter } from "./posts-slice.async-thunks-and-entities-adapter";

export const { selectAll: selectPosts } = postsAdapter.getSelectors(
  (state: RootState) => state.posts,
);
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectIsAddingNewPost = (state: RootState) =>
  state.posts.isAddingNewPost;
export const selectIsDeletingPost = (state: RootState) =>
  state.posts.isDeletingPost;
