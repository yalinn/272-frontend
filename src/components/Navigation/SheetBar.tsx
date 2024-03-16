"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/ui/sheet";
import HiveIcon from "@/assets/svg/HiveIcon";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LangType } from "../../lang";

export default function SheetBar({
  lang,
  locale,
}: {
  lang: LangType;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const navigate = (path: string) => {
    setOpen(false);
    window.location.href = path;
  };
  return (
    <Sheet key={"left"} open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="flex items-center cursor-pointer selection:bg-transparent">
          <HiveIcon className="w-8" />
          <h1 className={cn("text-2xl font-bold text-[#fec748]", "ml-2")}>
            Probee
          </h1>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <div className="flex cursor-pointer justify-center selection:bg-transparent">
              <HiveIcon className="w-8" />
              <h1 className={cn("text-2xl font-bold text-[#fec748]", "ml-2")}>
                Probee
              </h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex lg:justify-end w-full">
          <div className="flex flex-col gap-4 mt-4 lg:text-left lg:items-end w-full">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-[#fec748] transition-colors duration-300 ease-in-out"
            >
              {lang.route_home}
            </div>
            <div
              onClick={() => navigate("/submits")}
              className="cursor-pointer hover:text-[#fec748] transition-colors duration-300 ease-in-out"
            >
              {lang.route_submits}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
