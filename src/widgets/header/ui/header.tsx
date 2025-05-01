import { UserProfileMenu } from "@/entities/user";
import { ThemeToggle } from "@/features/theming";
import { Droplets } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-5">
      <Link href="/" className="flex items-center gap-2">
        <Droplets />
        <h3 className="text-xl">Droplets</h3>
      </Link>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <UserProfileMenu />
      </div>
    </header>
  );
}
