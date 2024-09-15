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
      session.token = data.token;
      session.user = data.user;
      await session.save();
      return Response.json(data, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getIronSession<{
    token: string;
    user: User;
  }>(cookies(), sessionOptions);
  if (session.token) {
    const data = await fetch(API_URL + "/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    }).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getIronSession<{
    token: string;
    user: User;
  }>(cookies(), sessionOptions);
  if (session.token) {
    const data = await fetch(API_URL + "/session", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    }).then((res) => res.json());
    return Response.json(data, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
