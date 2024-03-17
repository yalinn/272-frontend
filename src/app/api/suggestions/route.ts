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

export async function POST(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  try {
    const body = await request.json();
    const data = await fetch(API_URL + "/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /* @ts-ignore */
        Authorization: `Bearer ${session.token}`,
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
      return Response.json(data, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  try {
    const body = await request.json();
    const data = await fetch(API_URL + "/suggestions/" + body.id + "/star", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        /* @ts-ignore */
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ star: body.star }),
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
      return Response.json(data, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
