import { StoreProvider } from "./store";

export function Providers({ children }: React.PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}
