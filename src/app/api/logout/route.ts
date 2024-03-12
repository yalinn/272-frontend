import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/constants";
import type { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (session) {
    await session.destroy();
  }
  return Response.redirect(request.url?.replace("api/logout", "") || "/", 302);
}
