import { ThemeProvider } from "@/features/theming";
import { StoreProvider } from "./store";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
}
