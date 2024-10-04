"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
export default function SuggestionPage({
  params,
}: {
  params: { lang: string };
}) {
  const [pwd, setPwd] = useState("");
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: pwd }),
    }).then((res) => res.json());
  }
  useEffect(() => {
    if (pwd === "") {
      setPwd(prompt("Enter password") || "");
    } else {
      fetchCurriculum().then(setData);
    }
  }, [pwd]);
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
