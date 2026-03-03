import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";
import { JwtPayload, UserRole } from "./types";

export const AuthService = {
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },

  generateToken(userId: string, role: UserRole) {
    return jwt.sign({ userId, role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  },

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },
};