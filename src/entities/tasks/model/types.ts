import { Task as DBTask } from "@prisma/client";
import { EntityState } from "@reduxjs/toolkit";

export type Task = DBTask;

export type TaskId = Pick<Task, "id">["id"];

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type EntityTask = EntityState<Task, TaskId>;
