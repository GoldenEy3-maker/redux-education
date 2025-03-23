"use client";

import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "@/entities/tasks";
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

  const { data, isLoading } = useGetTasksQuery();
  const [addTask, { isLoading: isAddingTask }] = useAddTaskMutation();
  const [deleteTask, { isLoading: isDeletingTask }] = useDeleteTaskMutation();

  async function handleNewPostSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await addTask({ description: body, title, projectId: "1" });
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
          disabled={isAddingTask}
        />
        <Input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isAddingTask}
        />
        <Button disabled={isAddingTask}>Создать задачу</Button>
      </form>
      {!isLoading && data ? (
        <div className="grid grid-cols-4 gap-4">
          {data.ids.map((taskId) => (
            <Card key={taskId}>
              <CardHeader>
                <CardTitle>{data.entities[taskId].title}</CardTitle>
                <CardDescription>
                  {data.entities[taskId].description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="destructive"
                  disabled={isDeletingTask}
                  onClick={() => deleteTask(data.entities[taskId].id)}
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
