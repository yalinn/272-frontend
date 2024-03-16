import OPT from "@/config";
export const NodeEnv = process.env.NODE_ENV as "development" | "production";
export const DOMAIN = {
  development: `http://127.0.0.1:${OPT.PORT}`,
  production: OPT.PUBLIC_URL,
}[NodeEnv];
export const languageOptions = OPT.LANGUAGES;
export const website_version = OPT.WEBSITE_VERSION;
export const API_URL = {
  development: `http://127.0.0.1:${OPT.API_PORT}`,
  production: OPT.API_ENDPOINT,
}[NodeEnv];
export const SOCKET_URL = {
  development: `http://127.0.0.1:${OPT.WS_PORT}`,
  production: OPT.WS_ENDPOINT,
}[NodeEnv];

import type { SessionOptions } from "iron-session";
// https://github.com/vvo/iron-session?tab=readme-ov-file#session-options
export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: OPT.COOKIE_NAME,
  ttl: OPT.COOKIE_TTL,
  cookieOptions: {
    httpOnly: true,
    secure: NodeEnv === "production",
  },
};
