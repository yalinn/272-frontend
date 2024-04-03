"use client";
import Stars from "@/assets/svg/Stars";
import { useEffect, useState } from "react";
import { Suggestion } from "@/lib/utils";
export default function Home({ params }: { params: { lang: string } }) {
  const [data, setData] = useState<any>(Array(10).fill(null));
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
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
        <div className="flex justify-between w-full gap-4 items-center mb-4">
          <div className="flex h-12 gap-4 justify-start w-full items-center">
            <SelectMenu
              by={sortBy}
              setBy={setSortBy}
              placeholder={params.lang === "tr" ? "Sırala" : "Sort By"}
              lang={params.lang}
            >
              <Select.Group>
                {[
                  {
                    by: "date",
                    tr: "Tarih",
                    en: "Date",
                  },
                  {
                    by: "upvotes",
                    tr: "Oylama",
                    en: "Upvotes",
                  },
                  {
                    by: "stars",
                    tr: "Puan",
                    en: "Stars",
                  },
                ].map((filter) => (
                  <SelectItem value={filter.by} key={filter.by}>
                    {filter[params.lang == "tr" ? "tr" : "en"]}
                  </SelectItem>
                ))}
              </Select.Group>
            </SelectMenu>
            <SelectMenu
              by={filterBy}
              setBy={setFilterBy}
              placeholder={params.lang === "tr" ? "Bölüm" : "Department"}
              lang={params.lang}
            >
              <Select.Group>
                {Object.keys(departments)
                  .map((key: string) => ({
                    value: key,
                    /* @ts-ignore */
                    label: departments[key][params.lang == "tr" ? "tr" : "en"],
                  }))
                  .map((filter) => (
                    <SelectItem value={filter.value} key={filter.label}>
                      {filter.label}
                    </SelectItem>
                  ))}
              </Select.Group>
            </SelectMenu>
          </div>
          <SuggestDialog lang={params.lang}>
            <CreateSuggestions />
          </SuggestDialog>
        </div>
        <div className="flex flex-col w-full gap-2 overflow-visible overscroll-y-auto">
          {data.map(
            (suggestion: Suggestion, i: number) =>
              (suggestion && (
                <ProjectCard
                  author={suggestion.author}
                  department={
                    /* @ts-ignore */
                    departments[suggestion.author.slice(3, -3)][
                      params.lang == "tr" ? "tr" : "en"
                    ]
                  }
                  description={suggestion.content}
                  id={suggestion.id}
                  key={suggestion.id}
                  title={suggestion.title}
                  href="#"
                  stars={suggestion.stars}
                  date={suggestion.date}
                  upvotes={suggestion.upvotes}
                  vote={suggestion.vote || 0}
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
    <div className="p-4 min-h-64 lg:min-h-40 border-gray-200 rounded-xl border-2 relative animate-pulse">
      <p className="text-lg bg-gray-200/80 rounded-xl font-semibold max-w-20 md:max-w-80 animate-pulse h-6"></p>
      <p className="mt-4 bg-gray-200/50 h-6 rounded-xl max-w-32 md:max-w-96 animate-pulse"></p>
      <div className="mt-4 bg-blue-600 hover:underline absolute bottom-7 right-4 text-right w-20 text-sm h-4 rounded-xl"></div>
      <span className="absolute top-4 right-4 flex flex-col justify-end ">
        <div className="flex flex-col justify-end gap-2">
          <span className="text-xs w-full text-end">
            <Stars
              max={5}
              point={0}
              size={16}
              fill={"#fff"}
              voted={0}
              setVoted={() => {}}
              voteSuggestion={() => {}}
            />
            <div className="flex mt-3 items-center justify-end  ">
              <span className="text-xs rounded-xl bg-gray-600 h-3 w-10 text-end"></span>
            </div>
          </span>
        </div>
        <div className="flex mt-1 items-center justify-end  ">
          <span className="text-xs rounded-xl bg-gray-600 h-3 w-full text-end"></span>
        </div>
      </span>
      <span className="absolute bottom-5 left-4 gap-1 flex flex-col justify-end">
        <span className="text-xs rounded-xl bg-gray-600 w-16 h-3 text-end"></span>
        <span className="text-xs rounded-xl bg-gray-600 w-32 h-3 text-end"></span>
        <span className="text-xs rounded-xl bg-gray-600 w-24 h-3 text-end"></span>
      </span>
    </div>
  );
}

function ProjectCard({
  author,
  id: id,
  title,
  description,
  href,
  stars,
  upvotes,
  date,
  department,
  vote,
}: {
  author: string;
  department: string;
  id: string;
  title: string;
  description: string;
  href: string;
  stars?: number;
  upvotes?: number;
  date?: string;
  vote: number;
}) {
  const [voted, setVoted] = useState(vote);
  const time = new Date(date || "")
    .toTimeString()
    .split(":")
    .slice(0, 2)
    .join(":");
  date = new Date(date || "").toLocaleDateString();
  function voteSuggestion(v: number) {
    fetch("/api/suggestions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ star: v, id: id }),
    });
    setVoted(v);
  }
  return (
    <div className="p-4 min-h-64 lg:min-h-40 border-gray-200 rounded-xl border-2 relative">
      <p className="text-lg font-semibold max-w-40 md:max-w-80">{title}</p>
      <p className="mt-2 max-h-36 text-gray-600 max-w-44 md:max-w-96 lg:max-w-[36rem]">
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
          <Stars
            max={5}
            point={stars}
            size={16}
            fill={"#fff"}
            voted={voted}
            setVoted={setVoted}
            voteSuggestion={voteSuggestion}
          />
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
      <span className="absolute bottom-4 left-4 flex flex-col justify-start">
        <span className="text-xs text-gray-600 w-full">{author}</span>
        <span className="text-xs text-gray-600 w-full">{department}</span>
        <span className="text-xs text-gray-600 w-full">
          {date} {time}
        </span>
      </span>
    </div>
  );
}

function CreateSuggestions() {
  return (
    <div className="inline-flex items-center bg-[#fec748] justify-center rounded transition-colors duration-300 ease-in-out hover:bg-[#fec748]/90 px-[15px] text-zinc-900 text-[13px] leading-none h-[35px] gap-[5px] border-white/10 border hover:border-white/40 outline-none">
      <span>+</span>
      <span className="hidden md:block">Suggest</span>
    </div>
  );
}

import React, { RefObject } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { departments } from "../../../lib/deps";
import { SuggestDialog } from "../../../components/SuggestDialog";

function SelectMenu({
  by,
  setBy,
  lang,
  placeholder,
  children,
}: {
  by: string;
  setBy: (value: any) => void;
  lang: string;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <Select.Root value={by} onValueChange={setBy}>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] text-white border-white/10 border hover:border-white/40 outline-none"
        aria-label="Sort By"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-violet-100">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={cn(
            "overflow-hidden bg-[#09090b] border-white/40 border rounded-[8px]",
            "shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          )}
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-[#09090b] text-white cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">{children}</Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-[#09090b] text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: React.ReactNode; className: string; [key: string]: any },
    forwardedRef
  ) => {
    return (
      <Select.Item
        value={props.value}
        className={cn(
          "text-[13px] leading-none text-violet-100",
          "rounded-[10px] flex items-center",
          "h-[25px] pr-[35px] pl-[25px]",
          "relative select-none data-[disabled]:text-red-300 data-[disabled]:pointer-events-none",
          "data-[highlighted]:outline-none data-[highlighted]:bg-[#fec748] data-[highlighted]:text-[#09090b]",
          "transition-colors duration-200 ease-in-out",
          className
        )}
        {...props}
        ref={forwardedRef as RefObject<HTMLDivElement> | null}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
