import "server-only";

import crypto from "crypto";

class PasswordService {
  private readonly iterations = 10000;
  private readonly keyLength = 64;
  private readonly digest = "sha256";

  hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, this.iterations, this.keyLength, this.digest)
      .toString("hex");
    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, hashedPassword: string) {
    const [salt, hash] = hashedPassword.split(":");
    const newHash = crypto
      .pbkdf2Sync(password, salt, this.iterations, this.keyLength, this.digest)
      .toString("hex");
    return hash === newHash;
  }
}

export const passwordService = new PasswordService();
