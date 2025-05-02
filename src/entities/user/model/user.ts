export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string | null;
}

export type UserId = User["id"];
