import { ThemeProvider } from "@/features/theming";
import { StoreProvider } from "./store";
import { SessionProvider } from "@/shared/auth/context";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
