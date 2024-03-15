import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/constants";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (session) {
    await session.destroy();
  }
  return Response.redirect(request.url?.replace("api/logout", "") || "/", 302);
}
