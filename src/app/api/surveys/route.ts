import { type NextRequest } from "next/server";
import { API_URL, sessionOptions } from "@/lib/constants";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@/@types/base";

export const maxDuration = 60; // 1 minute
export async function GET(request: NextRequest) {
  const session = await getIronSession<{
    token: string;
    user: User;
    pwd: string;
  }>(cookies(), sessionOptions);
  if (session.token) {
    const data = await fetch(API_URL + "/portal/surveys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ password: session.pwd }),
    }).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
