"use client";
import { useEffect, useState } from "react";
import { DataTable, Suggestion } from "./data-table";
import { departments } from "@/lib/utils";

export default function SuggestionPage({
  params,
}: {
  params: { lang: string };
}) {
  const [data, setData] = useState<any>(
    Array(10).fill({
      id: 0,
      status: null,
      title: null,
      content: null,
      department: null,
      stars: 0,
      date: null,
      upvotes: 0,
      vote: 0,
    })
  );
  async function fetchSuggestions() {
    const data = await fetch("/api/suggestions/requested", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setData(
      data
        ?.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .map((d: Suggestion) => ({
          ...d,
          department:
            departments[d.author.slice(3, -3)][
              params.lang == "tr" ? "tr" : "en"
            ],
        })) || []
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
