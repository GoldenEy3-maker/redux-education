import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { authConfig } from "../config/auth-config";
import { JWT } from "next-auth/jwt";
import { User as EntityUser } from "@/entities/user";
declare module "next-auth" {
  interface User extends EntityUser {
    accessToken: string;
    refreshToken: string;
    id: string;
    email: string;
    name: string;
  }
  interface Session {
    user: EntityUser;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: EntityUser;
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch("http://localhost:3000/api/session/refresh", {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const tokens = (await response.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            return null;
          }

          const parsedResponse = (await res.json()) as JWT & {
            userInfo: Session["user"];
          };

          const accessToken = parsedResponse.accessToken;
          const refreshToken = parsedResponse.refreshToken;
          const userInfo = parsedResponse.userInfo;

          // You can make more request to get other information about the user eg. Profile details

          return {
            accessToken,
            refreshToken,
            ...userInfo,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        token.accessTokenExpires = decodedToken?.exp
          ? decodedToken.exp * 1000
          : 0;
      }

      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
          },
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      const refreshedToken = await refreshAccessToken(token);

      if (!refreshedToken) {
        return null;
      }

      return refreshedToken;
    },
    session: async ({ session, token }) => {
      // If token is null (refresh failed), return session without user
      if (!token) {
        return {
          ...session,
          user: undefined,
        };
      }

      if (token) {
        session.accessToken = token.accessToken;
        // @ts-expect-error emailVerified is not in the user
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
