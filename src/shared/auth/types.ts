import type { User as DBUser } from "@prisma/client";

export interface User extends DBUser {}
export interface Session {
  token: string | null;
  user: Omit<User, "password" | "tokenVersion"> | null;
}
