"use client";

import { useGetTeamsQuery } from "../api/api-slice";
import { TeamCard } from "./team-card";

export function TeamList() {
  const { data: teams, isLoading } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teams?.ids.map((teamId) => (
        <TeamCard key={teamId} {...teams.entities[teamId]} />
      ))}
    </div>
  );
}
