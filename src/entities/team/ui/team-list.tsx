import { getTeamsAction } from "../actions/get-teams-action";
import { TeamCard } from "./team-card";

export async function TeamList() {
  const teams = await getTeamsAction();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard key={team.id} {...team} />
      ))}
    </div>
  );
}
