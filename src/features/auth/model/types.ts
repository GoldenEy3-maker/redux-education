import { User as DBUser } from "@prisma/client";

export type User = DBUser;
export type Session = Omit<User, "password" | "tokenVersion">;
