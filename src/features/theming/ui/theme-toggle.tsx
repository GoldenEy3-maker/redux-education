"use client";

import { useTheme } from "next-themes";

import { Switch } from "@/shared/ui/switch";
import { useEffect, useState } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isShow, setIsShow] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <div>
      {isShow ? (
        <>
          <Switch
            id="theme-toggle"
            className="h-6 w-10 [&_[data-slot='switch-thumb']]:size-5"
            checked={resolvedTheme === "dark"}
            onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
            thumbSlot={
              resolvedTheme === "dark" ? (
                <Moon className="size-3" />
              ) : (
                <Sun className="size-3" />
              )
            }
          />
          <label htmlFor="theme-toggle" className="sr-only">
            Изменение темы
          </label>
        </>
      ) : (
        <Skeleton className="h-6 w-10 rounded-full" />
      )}
    </div>
  );
}
