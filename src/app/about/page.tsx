"use client";

import { useGetPostsQuery } from "@/entities/posts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

export default function AboutPage() {
  const { data, isLoading } = useGetPostsQuery();

  return (
    <main className="container mx-auto px-4 py-6">
      {!isLoading && data ? (
        <div className="grid grid-cols-4 gap-4">
          {data.ids.map((postId) => (
            <Card key={postId}>
              <CardHeader>
                <CardTitle>{data.entities[postId].title}</CardTitle>
                <CardDescription>{data.entities[postId].body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
