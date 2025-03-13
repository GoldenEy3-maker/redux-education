import { apiSlice } from "@/shared/api/api-slice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { EntityTask, NewTask, Task, TaskId } from "./types";

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  },
});

export const initialState = tasksAdapter.getInitialState();

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<EntityTask, void>({
      query: () => "/tasks",
      providesTags: ["Task"],
      transformResponse: (res: Task[]) => {
        return tasksAdapter.setAll(
          initialState,
          res.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
          })),
        );
      },
    }),
    addTask: builder.mutation<Task, NewTask>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
      onQueryStarted: async (newTask, { dispatch, queryFulfilled }) => {
        const getTasksPatchResult = dispatch(
          tasksApiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const newId = Date.now();
            const newTaskWithId = {
              ...newTask,
              id: newId,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            draft.ids.unshift(newId);
            draft.entities[newId] = newTaskWithId;
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTasksPatchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation<void, TaskId>({
      query: (taskId) => ({
        url: `/tasks?id=${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      onQueryStarted: async (taskId, { dispatch, queryFulfilled }) => {
        const getTaskPatchResult = dispatch(
          tasksApiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            tasksAdapter.removeOne(draft, taskId);
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTaskPatchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation } =
  tasksApiSlice;
