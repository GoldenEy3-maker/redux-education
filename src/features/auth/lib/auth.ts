import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { authConfig } from "../config/auth-config";

async function refreshAccessToken(token) {
  try {
    const response = await fetch("http://localhost:3000/api/session/refresh", {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("RefreshAccessTokenError");
    }

    const tokens = await response.json();

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
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
            // credentials are invalid
            return null;
          }

          const parsedResponse = await res.json();

          // accessing the accessToken returned by server
          const accessToken = parsedResponse.accessToken;
          const refreshToken = parsedResponse.refreshToken;
          const userInfo = parsedResponse?.userInfo;

          // You can make more request to get other information about the user eg. Profile details

          // return user credentials together with accessToken

          const value = {
            accessToken,
            refreshToken,
            role: userInfo?.role,
            email: userInfo?.email,
          };

          return value;
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
        token.accessTokenExpires = decodedToken?.exp * 1000;
      }

      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log("token is still valid");
        return token;
      }

      console.log("token is expired, refreshing...");

      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
