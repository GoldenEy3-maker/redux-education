import { createSelector } from "@reduxjs/toolkit";
import { initialState, tasksApiSlice } from "../api/api-slice";
import { tasksAdapter } from "../config/adapter";

const selectTasksResult = tasksApiSlice.endpoints.getTasks.select();

const selectTasksData = createSelector(
  selectTasksResult,
  (result) => result.data ?? initialState,
);

export const { selectAll: selectTasks } =
  tasksAdapter.getSelectors(selectTasksData);
