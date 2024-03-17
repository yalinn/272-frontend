"use client";
import Stars from "@/assets/svg/Stars";
import { useEffect, useState } from "react";
export default function Home({ params }: { params: { lang: string } }) {
  const [data, setData] = useState<any>(Array(10).fill(null));
  async function fetchSuggestions() {
    const data = await fetch("/api/suggestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setData(data || []);
    return data;
  }
  useEffect(() => {
    fetchSuggestions();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-12 justify-center w-full items-center">
          {/* <SearchBar /> */}
          <CreateSuggestions />
        </div>
        <div className="flex flex-col w-full gap-2 mt-10 overflow-visible overscroll-y-auto">
          {data.map(
            (suggestion: any, i: number) =>
              (suggestion && (
                <ProjectCard
                  key={suggestion.id}
                  title={suggestion.title}
                  description={suggestion.content}
                  href="#"
                  stars={1.3}
                />
              )) || <Loading key={i} />
          )}
        </div>
      </div>
    </div>
  );
}

function Loading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="p-4 min-h-40 border-gray-200 rounded-xl border-2 relative animate-pulse">
      <p className="text-lg bg-gray-200/80 rounded-xl font-semibold max-w-40 md:max-w-80 animate-pulse h-6"></p>
      <p className="mt-4 bg-gray-200/50 h-6 rounded-xl max-w-44 md:max-w-96 animate-pulse"></p>
      <div className="mt-4 bg-blue-600 hover:underline absolute bottom-7 right-4 text-right w-20 text-sm h-4 rounded-xl"></div>
      <span className="absolute top-4 right-4 flex flex-col justify-end ">
        <div className="flex flex-col justify-end gap-2">
          <span className="text-xs w-full text-end">
            <Stars max={5} point={0} size={16} fill={"#fec748"} />
            <div className="flex mt-3 items-center justify-end  ">
              <span className="text-xs rounded-xl bg-gray-600 h-3 w-10 text-end"></span>
            </div>
          </span>
        </div>
        <div className="flex mt-1 items-center justify-end  ">
          <span className="text-xs rounded-xl bg-gray-600 h-3 w-full text-end"></span>
        </div>
      </span>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  href,
  stars,
  upvotes,
}: {
  title: string;
  description: string;
  href: string;
  stars?: number;
  upvotes?: number;
}) {
  return (
    <div className="p-4 min-h-40 border-gray-200 rounded-xl border-2 relative">
      <p className="text-lg font-semibold max-w-40 md:max-w-80">{title}</p>
      <p className="mt-2  max-h-30 text-gray-600 max-w-44 md:max-w-96 lg:max-w-[36rem]">
        {description.slice(0, 60) + (description.length > 60 ? "..." : "")}
      </p>
      <a
        href={"#"}
        className="mt-4 text-blue-600 hover:underline absolute bottom-4 right-4 text-right w-20 text-sm h-8 rounded-xl"
      >
        Learn more
      </a>
      <span className="absolute top-4 right-4 flex flex-col justify-end">
        <div className="flex flex-col justify-end gap-2">
          <Stars max={5} point={stars} size={16} fill={"#fec748"} />
          <span className="text-xs text-gray-600 w-full text-end">
            {stars} stars
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-xs text-gray-600 w-full text-end">
            {upvotes || 0} upvotes
          </span>
        </div>
      </span>
    </div>
  );
}

function CreateSuggestions() {
  return (
    <div className="flex flex-col items-center justify-center">
      <button className="flex justify-center bg-[#fec748] rounded-xl p-2 h-10 w-10 md:w-auto text-zinc-900 hover:bg-[#fec748]/90 transition-colors duration-300 ease-in-out">
        <span>+</span>
        <span className="hidden md:block">Suggest</span>
      </button>
    </div>
  );
}
