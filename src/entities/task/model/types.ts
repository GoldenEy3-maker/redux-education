import { Task as DBTask } from "@prisma/client";
import { EntityState } from "@reduxjs/toolkit";

export interface Task extends DBTask {}

export type TaskId = Pick<Task, "id">["id"];

export interface NewTask extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}

export interface EntityTask extends EntityState<Task, TaskId> {}
