import { NewTask } from "@/entities/tasks";
import { db } from "@/shared/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  const headersList = await headers();
  const token = headersList.get("Authorization");
  if (!token)
    return new Response("Unauthorized", {
      status: 401,
    });
  const tasks = await db.task.findMany();
  return Response.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as NewTask;
  console.log(body);
  const task = await db.task.create({
    data: body,
  });
  return Response.json(task);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id)
    return new Response("ID is undefined", {
      status: 400,
    });

  await db.task.delete({
    where: {
      id,
    },
  });
  return Response.json(true);
}
