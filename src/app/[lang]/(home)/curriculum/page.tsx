"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
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
  async function fetchCurriculum() {
    return await fetch("/api/curriculum", {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  useEffect(() => {
    fetchCurriculum().then(setData);
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
