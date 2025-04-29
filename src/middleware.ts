import { authConfig } from "@/features/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { ROUTES_MAP } from "./shared/constants/routes";

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/test"];

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === "/") &&
    !PROTECTED_ROUTES.find((route) => nextUrl.pathname.includes(route));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROUTES_MAP.Login, nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
