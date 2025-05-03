import { User as ApiUser } from "@/__generated__/Api";

export interface User extends ApiUser {}

export type UserId = User["id"];
