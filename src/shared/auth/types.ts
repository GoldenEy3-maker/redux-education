import type { User as DBUser } from "@prisma/client";

export interface User extends DBUser {}
export interface Session extends Omit<User, "password" | "tokenVersion"> {}
