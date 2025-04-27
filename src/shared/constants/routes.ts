export const ROUTES_MAP = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  TeamDetail: (id: string) => `/team/${id}`,
} as const;
