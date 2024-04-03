"use client";
import React, { RefObject } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

function SelectMenu({
  filterBy,
  setFilterBy,
}: {
  filterBy: string;
  setFilterBy: (value: string) => void;
}) {
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px]  text-violet11 border-white border hover:bg-mauve3 data-[placeholder]:text-violet9 outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Filter by" />
        <Select.Icon className="text-violet-100">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={cn(
            "overflow-hidden bg-[#09090b] border-white border rounded-xl",
            "shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          )}
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-[#09090b] text-white cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              {[
                {
                  by: "Department",
                  tr: "Bölüm",
                  en: "Department",
                },
                {
                  by: "Title",
                  tr: "Başlık",
                  en: "Title",
                },
                {
                  by: "Date",
                  tr: "Tarih",
                  en: "Date",
                },
                {
                  by: "Upvotes",
                  tr: "Oylama",
                  en: "Upvotes",
                },
                {
                  by: "Stars",
                  tr: "Puan",
                  en: "Stars",
                },
              ].map((filter) => (
                <SelectItem value={filter.by} key={filter.by}>
                  {filter.tr}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
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
export { SelectItem };
export default SelectMenu;
