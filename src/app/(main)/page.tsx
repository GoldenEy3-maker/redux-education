import { SomeClientComp } from "./some-client-comp";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Команды</h2>
        {/* <TeamList /> */}
        <SomeClientComp />
        <Link href="/test">Test</Link>
      </section>
      {/* <CreateTeamDialogDrawer /> */}
    </>
  );
}
