"use client";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Pencil } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { UserEditProfileForm } from "./user-edit-profile-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { DialogTrigger } from "@/shared/ui/dialog";
import { useState } from "react";

export function UserEditProfileModalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  function onSuccessEditProfile() {
    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <Pencil />
            <span>Редактировать</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl">
              Редактирование профиля
            </DrawerTitle>
          </DrawerHeader>
          <UserEditProfileForm onSuccess={onSuccessEditProfile} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Pencil />
          <span>Редактировать</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Редактирование профиля</DialogTitle>
        </DialogHeader>
        <UserEditProfileForm onSuccess={onSuccessEditProfile} />
      </DialogContent>
    </Dialog>
  );
}
