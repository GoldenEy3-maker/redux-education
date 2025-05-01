import { auth } from "@/features/auth";
import { LogOutButton } from "./logout-button";

export default async function TestPage() {
  const session = await auth();
  return (
    <div>
      {session?.user?.email} <LogOutButton />
    </div>
  );
}
