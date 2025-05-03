import { ThemeProvider } from "@/features/theming";
import { StoreProvider } from "./store";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider
        // Can be used to prevent session from being refetched on background
        // refetchOnWindowFocus={false}
        // refetchInterval={0}
        // refetchWhenOffline={false}
        >
          {children}
        </SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
