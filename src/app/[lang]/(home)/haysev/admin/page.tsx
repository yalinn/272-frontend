"use client";
import { useEffect, useState } from "react";
import { DataTable, Request } from "./data-table";
import { departments } from "@/lib/utils";

export default function SuggestionPage({
  params,
}: {
  params: { lang: string };
}) {
  const [data, setData] = useState<any>(
    Array<Request>(10).fill({
      id: "",
      status: "processing",
      title: "",
      description: "",
      author: "",
      start_time: "",
      organizer_id: "",
      created_at: "",
    })
  );
  async function fetchSuggestions() {
    const data = await fetch("/api/haysev/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log({ data });
    setData(
      data
        ?.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        ) || []
    );
  }
  useEffect(() => {
    fetchSuggestions();
  }, []);
  return (
    <div className="container mx-auto py-10">
      {data[0] ? (
        <DataTable data={data} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div></div>
        </div>
      )}
    </div>
  );
}
