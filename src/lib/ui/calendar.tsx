"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onSelect?: (date: Date) => void
  daylist?: Date[]
  mylist?: Date[]
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onSelect,
  daylist,
  mylist,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "rounded-md w-9 font-normal text-[0.8rem] text-zinc-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-100/50 [&:has([aria-selected])]:bg-zinc-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-zinc-800/50 [&:has([aria-selected])]:bg-zinc-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-900 hover:text-zinc-50 focus:bg-zinc-900 focus:text-zinc-50 bg-zinc-50 text-zinc-900 hover:bg-zinc-50 hover:text-zinc-900 focus:bg-zinc-50 focus:text-zinc-900",
        day_today: "text-zinc-100 bg-zinc-800/10 hover:bg-white/10",
        day_outside:
          "day-outside aria-selected:bg-zinc-100/50 text-zinc-400 aria-selected:bg-zinc-800/50 aria-selected:text-zinc-400",
        day_disabled: "text-zinc-500 opacity-50 text-zinc-400",
        day_range_middle:
          "aria-selected:bg-zinc-100 aria-selected:text-zinc-900 aria-selected:bg-zinc-800 aria-selected:text-zinc-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
        Day: (props: DayProps) => {
          const { date } = props;
          let bgcode = "";
          if (daylist?.map(day => new Date(day.setHours(0, 0, 0, 0)).toDateString()).includes(date.toDateString())) {
            bgcode = "bg-amber-400 text-zinc-800 hover:bg-amber-200";
          }
          if (mylist?.map(day => new Date(day.setHours(0, 0, 0, 0)).toDateString()).includes(date.toDateString())) {
            bgcode = "bg-blue-500 text-zinc-800 hover:bg-blue-400";
          }
          bgcode += " rounded-full";
          return (
            <button
              className={[
                "h-9 w-9 p-0 font-normal hover:bg-zinc-100/10 duration-200",
                (new Date(new Date().setHours(0, 0, 0, 0)).getTime() > date.getTime() ? "text-zinc-500" : ""),
                bgcode,
              ].join(" ")}
              disabled={new Date(new Date().setHours(0, 0, 0, 0)).getTime() > date.getTime()}
              onClick={() => onSelect?.(date)}
            >
              {new Date(date).getDate()}
            </button>
          );
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
