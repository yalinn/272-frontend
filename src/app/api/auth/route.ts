import { type NextRequest } from "next/server";
import { API_URL, sessionOptions } from "@/lib/constants";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  try {
    const body = await request.json();
    const data = await fetch(API_URL + "/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch((e) => {
        return Response.json(
          { message: "Something went wrong", error: e.message, status: 500 },
          { status: 500 }
        );
      })
      .then((res) => {
        return res.json();
      });
    if (data.error) {
      return Response.json(data, { status: data.status });
    } else {
      /* @ts-ignore */
      session.token = data.token;
      /* @ts-ignore */
      session.user = data.user;
      await session.save();
      return Response.json(data, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
