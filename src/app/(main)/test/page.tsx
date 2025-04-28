import { auth } from "@/shared/auth/auth";
import { redirect } from "next/navigation";

export default async function TestPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>{session.user?.email}</div>;
}
