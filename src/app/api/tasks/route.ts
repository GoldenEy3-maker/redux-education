import { NewTask } from "@/entities/tasks";
import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET() {
  const tasks = await db.query.tasks.findMany();
  return Response.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as NewTask;
  const task = await db.insert(tasks).values(body).returning();
  return Response.json(task);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  await db.delete(tasks).where(eq(tasks.id, parseInt(id!)));
  return Response.json(true);
}
