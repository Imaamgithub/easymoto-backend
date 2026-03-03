export type UserRole = "ADMIN" | "RIDER" | "SYSTEM";

export interface JwtPayload {
  userId: string;
  role: UserRole;
}