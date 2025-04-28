"use client";

import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "./types";
import { auth } from "./auth";
import Cookies from "js-cookie";

interface SessionContext {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setSession: Dispatch<SetStateAction<Session | null>>;
}

const SessionContext = createContext<SessionContext | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const status = isLoading
    ? "loading"
    : session
      ? "authenticated"
      : "unauthenticated";

  async function fetchSession() {
    setIsLoading(true);

    try {
      const session = await auth();
      setSession(session);
      if (session?.token) Cookies.set("accessToken", session.token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, status, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within an SessionProvider");
  return context;
}
