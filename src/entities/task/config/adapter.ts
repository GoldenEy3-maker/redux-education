import { createEntityAdapter } from "@reduxjs/toolkit";
import { Task } from "../model/types";

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate.getTime() - aDate.getTime();
  },
});
