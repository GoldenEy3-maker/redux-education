"use client";

import { createAppAsyncThunk } from "@/shared/lib/store-hooks";
import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

type PostId = number;

type Post = {
  id: PostId;
  title: string;
  body: string;
  userId: number;
};

type NewPost = Omit<Post, "id">;

type PostsState = EntityState<Post, PostId> & {
  status: "idle" | "pending" | "rejected" | "succeeded";
  isAddingNewPost: boolean;
  isDeletingPost: boolean;
};

export const postsAdapter = createEntityAdapter<Post>();

const initialState: PostsState = postsAdapter.getInitialState({
  status: "idle",
  isAddingNewPost: false,
  isDeletingPost: false,
});

export const fetchPosts = createAppAsyncThunk("posts/getPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (await response.json()) as Post[];
  return data;
});

export const addNewPost = createAppAsyncThunk(
  "posts/addNewPost",
  async (newPost: NewPost) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = (await response.json()) as Post;

    return data;
  },
);

export const deletePost = createAppAsyncThunk(
  "posts/deletePost",
  async (id: PostId) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  },
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addNewPost.pending, (state) => {
        state.isAddingNewPost = true;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isAddingNewPost = false;
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewPost.rejected, (state) => {
        state.isAddingNewPost = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isDeletingPost = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isDeletingPost = false;
        postsAdapter.removeOne(state, action.meta.arg);
      })
      .addCase(deletePost.rejected, (state) => {
        state.isDeletingPost = false;
      });
  },
});
