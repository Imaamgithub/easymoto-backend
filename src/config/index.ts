import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "3000",
  nodeEnv: process.env.NODE_ENV || "development",
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || "",
  chapaKey: process.env.CHAPA_KEY || "",
  expoPushUrl: process.env.EXPO_PUSH_URL || "https://exp.host/--/api/v2/push/send",
  databaseUrl: process.env.DATABASE_URL || ""
};
