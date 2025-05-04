"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { UserEditProfileModalDrawer } from "./user-edit-profile-modal-drawer";

export function UserProfileMenu() {
  const { data: session } = useSession();

  if (!session?.user) return <Skeleton className="size-10 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0">
          <Avatar className="size-10">
            <AvatarFallback>
              {session.user.surname?.[0]}
              {session.user.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        <DropdownMenuItem asChild>
          <UserEditProfileModalDrawer />
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={() => signOut({ redirect: true })}>
          <Button variant="ghost" className="w-full justify-start">
            <LogOut />
            Выйти
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
