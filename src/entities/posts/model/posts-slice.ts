"use client";

import { apiSlice } from "@/shared/api/api-slice";

type PostId = number;

type Post = {
  id: PostId;
  title: string;
  body: string;
  userId: number;
};

type NewPost = Omit<Post, "id">;

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(newPost, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          postsApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.unshift({ ...newPost, id: Date.now() });
          }),
        );

        try {
          await lifecycleApi.queryFulfilled;
        } catch (error) {
          getPostsPatchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useAddNewPostMutation } = postsApiSlice;
