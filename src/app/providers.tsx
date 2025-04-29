import { ThemeProvider } from "@/features/theming";
import { StoreProvider } from "./store";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
