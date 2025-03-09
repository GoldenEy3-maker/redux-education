import { EntityState } from "@reduxjs/toolkit";

export type PostId = number;

export type Post = {
  id: PostId;
  title: string;
  body: string;
  userId: number;
};

export type EntityPostState = EntityState<Post, number>;

export type NewPost = Omit<Post, "id">;
