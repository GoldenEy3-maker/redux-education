import { auth } from "@/features/auth";

export default async function TestPage() {
  const session = await auth();
  return <div>{session?.user?.email}</div>;
}
