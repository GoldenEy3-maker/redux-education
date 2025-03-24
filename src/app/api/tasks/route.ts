import { NewTask } from "@/entities/tasks";
import { ApiException } from "@/shared/api/api-exception";
import { db } from "@/shared/db";
import { tokenService } from "@/shared/lib/token-service";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET() {
  const headerStore = await headers();
  const token = headerStore.get("Authorization");
  if (!token) return ApiException.Unauthorized();
  const payload = await tokenService.verifyAccessToken(token.split(" ")[1]);
  if (!payload) return ApiException.Unauthorized();
  const tasks = await db.task.findMany();
  return Response.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as NewTask;
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
