"use client";

import { apiSlice } from "@/shared/api/api-slice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { EntityPostState, NewPost, Post, PostId } from "./types";

export const postsAdapter = createEntityAdapter<Post>();

export const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityPostState, void>({
      query: () => "/posts",
      providesTags: ["Post"],
      transformResponse(res: Post[]) {
        return postsAdapter.setAll(initialState, res);
      },
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const getPostsPatchResult = dispatch(
          postsApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const newId = Date.now();
            const newPostWithId = { ...newPost, id: newId };
            draft.ids.unshift(newId);
            draft.entities[newId] = newPostWithId;
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getPostsPatchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation<void, PostId>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const getPostsPatchResult = dispatch(
          postsApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            postsAdapter.removeOne(draft, postId);
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getPostsPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
} = postsApiSlice;
