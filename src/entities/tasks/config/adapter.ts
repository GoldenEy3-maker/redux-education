import { createEntityAdapter } from "@reduxjs/toolkit";
import { Task } from "../model/types";

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  },
});
