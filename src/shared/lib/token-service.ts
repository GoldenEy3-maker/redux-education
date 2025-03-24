import { env } from "@/env";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type AccessTokenPayload = {
  email: string;
};

type RefreshTokenPayload = {
  id: string;
  tokenVersion: number;
  remember: boolean;
};

class TokenService {
  async generateTokens(payload: AccessTokenPayload & RefreshTokenPayload) {
    const { id, email, tokenVersion, remember } = payload;

    const accessToken = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(new TextEncoder().encode(env.ACCESS_TOKEN_SECRET));
    const refreshToken = await new SignJWT({ id, tokenVersion, remember })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(remember ? "30d" : "1d")
      .sign(new TextEncoder().encode(env.REFRESH_TOKEN_SECRET));

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload | null> {
    try {
      const { payload } = await jwtVerify<AccessTokenPayload>(
        token,
        new TextEncoder().encode(env.ACCESS_TOKEN_SECRET),
      );

      return payload;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
    try {
      const { payload } = await jwtVerify<RefreshTokenPayload>(
        token,
        new TextEncoder().encode(env.REFRESH_TOKEN_SECRET),
      );

      return payload;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async sendRefreshToken(token: string, remember: boolean) {
    const cookiesStore = await cookies();

    return cookiesStore.set("refresh", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
      maxAge: remember ? 1000 * 60 * 60 * 24 * 30 : undefined,
    });
  }
}

export const tokenService = new TokenService();
