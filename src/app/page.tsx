"use client";

import {
  useAddNewPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "@/entities/posts";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading } = useGetPostsQuery();
  const [addNewPost, { isLoading: isAddingNewPost }] = useAddNewPostMutation();
  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();

  async function handleNewPostSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await addNewPost({ body, title, userId: 1 });
      setTitle("");
      setBody("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <form onSubmit={handleNewPostSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isAddingNewPost}
        />
        <Input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isAddingNewPost}
        />
        <Button disabled={isAddingNewPost}>Создать новый пост</Button>
      </form>
      {!isLoading && data ? (
        <div className="grid grid-cols-4 gap-4">
          {data.ids.map((postId) => (
            <Card key={postId}>
              <CardHeader>
                <CardTitle>{data.entities[postId].title}</CardTitle>
                <CardDescription>{data.entities[postId].body}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="destructive"
                  disabled={isDeletingPost}
                  onClick={() => deletePost(data.entities[postId].id)}
                >
                  Удалить
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
