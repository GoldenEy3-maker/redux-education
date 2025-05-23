"use client";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { CreateTeamForm } from "./create-team-form";
import { Plus } from "lucide-react";

export function CreateTeamDialogDrawer() {
  const [open, setOpen] = useState(false);
  const isLaptop = useMediaQuery("(max-width: 768px)");

  function onSuccessCreateTeam() {
    setOpen(false);
  }

  if (isLaptop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-dashed"
          >
            <Plus />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Новая команда</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <CreateTeamForm onSuccess={onSuccessCreateTeam} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-dashed"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Новая команда</DialogTitle>
        </DialogHeader>
        <CreateTeamForm onSuccess={onSuccessCreateTeam} />
      </DialogContent>
    </Dialog>
  );
}
