import { API_URL, DOMAIN, sessionOptions } from "@/lib/constants";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

async function getData(): Promise<any | any[]> {
  const session = (await getIronSession(cookies(), sessionOptions)) as {
    token: string;
  };
  const data = await fetch(API_URL + "/suggestions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.token,
      "Access-Control-Allow-Origin": DOMAIN,
    },
  }).then((res) => res.json());
  return data || [];
}

export default async function DemoPage() {
  const data = await getData();
  if (data.message) {
    return <div>{data.message}</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} />
    </div>
  );
}
