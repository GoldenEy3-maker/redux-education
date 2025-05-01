import { CreateTeamDialogDrawer, TeamList } from "@/entities/team";

export default async function Home() {
  return (
    <>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Команды</h2>
        <TeamList />
      </section>
      <CreateTeamDialogDrawer />
    </>
  );
}
