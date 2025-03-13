import { createSelector } from "@reduxjs/toolkit";
import { initialState, tasksAdapter, tasksApiSlice } from "./tasks-slice";

const selectTasksResult = tasksApiSlice.endpoints.getTasks.select();

const selectTasksData = createSelector(
  selectTasksResult,
  (result) => result.data ?? initialState,
);

export const { selectAll: selectTasks } =
  tasksAdapter.getSelectors(selectTasksData);
