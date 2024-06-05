import { type NextRequest } from "next/server";
import { API_URL, sessionOptions } from "@/lib/constants";
import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getIronSession(cookies(), sessionOptions);
  /* @ts-ignore */
  if (session.token) {
    const data = await fetch(API_URL + "/suggestions/" + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        /* @ts-ignore */
        Authorization: `Bearer ${session.token}`,
      },
    }).then((res) => res.json());
    console.log({ data });
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = (await getIronSession(
    cookies(),
    sessionOptions
  )) as IronSession<{ token: string }>;
  if (session.token) {
    const body = await request.json();
    if (
      !body.action ||
      !["reject", "approve", "report"].includes(body.action)
    ) {
      return Response.json(
        { message: "Invalid action", status: 400 },
        { status: 400 }
      );
    }
    const data = await fetch(
      API_URL + "/suggestions/" + params.id + "/" + body.action,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          /* @ts-ignore */
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());
    return Response.json(data, { status: 200 });
  }
}
