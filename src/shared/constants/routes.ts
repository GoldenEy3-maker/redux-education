export const ROUTES_MAP = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  Team: "/team",
  TeamDetail: (id: string) => `/team/${id}`,
} as const;
