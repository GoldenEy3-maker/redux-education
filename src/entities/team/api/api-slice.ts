import { apiSlice } from "@/shared/api/api-slice";
import { CreateTeamFormSchema } from "../model/create-team-form-schema";
import { teamAdapter } from "../config/adapter";
import { EntityTeam, Team, TeamId } from "../model/types";

export const initialState = teamAdapter.getInitialState();

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<
      void,
      CreateTeamFormSchema & { authorId: string }
    >({
      query: (args) => ({
        url: "/team",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Team"],
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        const getTeamsPatchResult = dispatch(
          teamApiSlice.util.updateQueryData("getTeams", undefined, (draft) => {
            const newId = crypto.randomUUID();
            const newTeam: Team = {
              ...args,
              id: newId,
              authorId: args.authorId,
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
    getTeams: builder.query<EntityTeam, void>({
      query: () => "/team",
      providesTags: ["Team"],
      transformResponse: (res: Team[]) => teamAdapter.setAll(initialState, res),
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsQuery,
  useDeleteTeamMutation,
} = teamApiSlice;
