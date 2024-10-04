import { type NextRequest } from "next/server";
import { API_URL, sessionOptions } from "@/lib/constants";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { User } from "@/@types/base";

export async function POST(request: NextRequest) {
  const session = await getIronSession<{
    token: string;
    user: User;
  }>(cookies(), sessionOptions);
  if (session.token) {
    const body = await request.json();
    const data = await fetch(API_URL + "/portal/curriculum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
