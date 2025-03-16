import { users } from "../db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Session = Omit<User, "password">;
