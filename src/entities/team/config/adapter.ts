import { createEntityAdapter } from "@reduxjs/toolkit";
import { Team } from "../model/types";

export const teamAdapter = createEntityAdapter<Team>({
  sortComparer: (a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate.getTime() - aDate.getTime();
  },
});
