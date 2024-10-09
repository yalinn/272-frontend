"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { Input } from "@/lib/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";

export type Course = {
  code: string;
  course_id: string;
  course_type: string;
  course_code: string;
  course_name: string;
  credits: string;
  grade: string;
  semester: number;
  year: number;
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const code = row.getValue("code");
      return (
        <div
          className={
            !!code
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {code as string}
        </div>
      );
    },
  },
  {
    accessorKey: "course_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course_id = row.getValue("course_id");
      return (
        <div
          className={
            !!course_id
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {course_id as string}
        </div>
      );
    },
  },
  {
    accessorKey: "course_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course_code = row.getValue("course_code");
      return (
        <div
          className={
            !!course_code
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {course_code as string}
        </div>
      );
    },
  },
  {
    accessorKey: "course_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const course_name = row.getValue("course_name");
      return (
        <div
          className={
            !!course_name
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {course_name as string}
        </div>
      );
    },
  },
  {
    accessorKey: "credits",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Credits
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const credits = row.getValue("credits");
      return (
        <div
          className={
            !!credits
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {credits as string}
        </div>
      );
    },
  },
  {
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const semester = row.getValue("semester");
      const year = row.getValue("year");
      return (
        <div
          className={
            !!semester
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {Number(semester) + (Number(year) - 1) * 2}
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const year = row.getValue("year");
      return (
        <div
          className={
            !!year
              ? "capitalize"
              : "bg-gray-200/80 w-20 h-4 animate-pulse rounded-xl"
          }
        >
          {year as number}
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: Course[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-xl"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto rounded-xl">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-2xl px-2 py-1 border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (
                    !header.column.getFacetedRowModel().rows[0]._valuesCache[
                    header.id
                    ]
                  )
                    return <TableHead key={header.id}></TableHead>;
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder && header.column.columns
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
