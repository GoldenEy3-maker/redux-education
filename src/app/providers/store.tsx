"use client";

import { useRef } from "react";
import { configureAppStore } from "../store";
import { Provider } from "react-redux";

export function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) storeRef.current = configureAppStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
