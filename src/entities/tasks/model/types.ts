import { tasks } from "@/shared/db/schema/tasks";
import { EntityState } from "@reduxjs/toolkit";
import { InferSelectModel } from "drizzle-orm";

export type Task = InferSelectModel<typeof tasks>;

export type TaskId = Pick<Task, "id">["id"];

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type EntityTask = EntityState<Task, TaskId>;
