import { CreateTeamDialogDrawer, TeamList } from "@/entities/team";

export default async function Home() {
  return (
    <>
      <section className="mb-6">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-bold">Команды</h2>
          <CreateTeamDialogDrawer />
        </div>
        <TeamList />
      </section>
    </>
  );
}
