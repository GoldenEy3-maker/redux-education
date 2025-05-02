import { apiSlice } from "@/shared/api/api-slice";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { teamAdapter } from "../config/adapter";
import { EntityTeam, Team, TeamId } from "../model/types";
import { getSession } from "next-auth/react";
import { UserId } from "@/entities/user";

export const initialState = teamAdapter.getInitialState();

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<void, CreateTeamFormSchema>({
      query: (args) => ({
        url: "/team",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Team"],
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        const session = await getSession();
        if (!session) return;

        const getTeamsPatchResult = dispatch(
          teamApiSlice.util.updateQueryData("getTeams", undefined, (draft) => {
            const newId = crypto.randomUUID();
            const newTeam: Team = {
              ...args,
              id: newId,
              authorId: session.user.id,
              members: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            draft.ids.unshift(newId);
            draft.entities[newId] = newTeam;
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTeamsPatchResult.undo();
        }
      },
    }),
    deleteTeam: builder.mutation<void, TeamId>({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
      onQueryStarted: async (teamId, { queryFulfilled, dispatch }) => {
        const getTeamsPatchResult = dispatch(
          teamApiSlice.util.updateQueryData("getTeams", undefined, (draft) => {
            draft.ids = draft.ids.filter((id) => id !== teamId);
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTeamsPatchResult.undo();
        }
      },
    }),
    joinTeam: builder.mutation<void, { teamId: TeamId; userId: UserId }>({
      query: ({ teamId }) => ({
        url: `/team/${teamId}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Team"],
      onQueryStarted: async (
        { teamId, userId },
        { queryFulfilled, dispatch },
      ) => {
        const getTeamsPatchResult = dispatch(
          teamApiSlice.util.updateQueryData("getTeams", undefined, (draft) => {
            const team = draft.entities[teamId];
            if (!team) return;
            team.members.push({ id: userId });
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTeamsPatchResult.undo();
        }
      },
    }),
    leaveTeam: builder.mutation<void, { teamId: TeamId; userId: UserId }>({
      query: ({ teamId }) => ({
        url: `/team/${teamId}/leave`,
        method: "POST",
      }),
      invalidatesTags: ["Team"],
      onQueryStarted: async (
        { teamId, userId },
        { queryFulfilled, dispatch },
      ) => {
        const getTeamsPatchResult = dispatch(
          teamApiSlice.util.updateQueryData("getTeams", undefined, (draft) => {
            const team = draft.entities[teamId];
            if (!team) return;
            team.members = team.members.filter(
              (member) => member.id !== userId,
            );
          }),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          getTeamsPatchResult.undo();
        }
      },
    }),
    getTeams: builder.query<EntityTeam, void>({
      query: () => "/team",
      providesTags: ["Team"],
      transformResponse: (res: Team[]) => teamAdapter.setAll(initialState, res),
    }),
  }),
});

export const {
  useJoinTeamMutation,
  useCreateTeamMutation,
  useGetTeamsQuery,
  useDeleteTeamMutation,
  useLeaveTeamMutation,
} = teamApiSlice;
