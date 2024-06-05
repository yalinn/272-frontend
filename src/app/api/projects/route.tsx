import { type NextRequest } from "next/server";
import { API_URL, sessionOptions } from "@/lib/constants";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  /* @ts-ignore */
  if (session.token) {
    const data = await fetch(API_URL + "/suggestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        /* @ts-ignore */
        Authorization: `Bearer ${session.token}`,
      },
    }).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}