import { authConfig } from "@/features/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { ROUTES_MAP } from "./shared/constants/routes";

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = [ROUTES_MAP.Login, ROUTES_MAP.Register];
const PROTECTED_ROUTES = [ROUTES_MAP.Team];

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  // const isPublicRoute =
  //   (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
  //     nextUrl.pathname === "/") &&
  //   !PROTECTED_ROUTES.find((route) => nextUrl.pathname.includes(route));

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) &&
    !PROTECTED_ROUTES.find((route) => nextUrl.pathname.includes(route));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROUTES_MAP.Login, nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
