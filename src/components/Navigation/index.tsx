import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/ui/sheet";
import { LangType } from "@/lang";
import { cn } from "@/lib/utils";
import HiveIcon from "@/assets/svg/HiveIcon";
import Link from "next/link";
export default async function NavBar({ lang }: { lang: LangType }) {
  return (
    <nav
      className={cn(
        "flex lg:px-64 items-center justify-between w-full p-8",
        "dark:bg-[#09090b] bg-[#fbfbfd]",
        "border-b border-gray-300/30"
      )}
    >
      <div className="flex">
        <Sheet key={"left"}>
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
                <div className="flex cursor-pointer selection:bg-transparent">
                  <HiveIcon className="w-8" />
                  <h1
                    className={cn("text-2xl font-bold text-[#fec748]", "ml-2")}
                  >
                    Probee
                  </h1>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex lg:justify-end">
              <div className="flex flex-col gap-4 mt-4 lg:text-left lg:items-end w-full">
                <Link href="/">
                  <div className="hover:text-[#fec748] transition-colors duration-300 ease-in-out">
                    {lang.route_home}
                  </div>
                </Link>
                <Link href="/submits">
                  <div className="hover:text-[#fec748] transition-colors duration-300 ease-in-out">
                    {lang.route_submits}
                  </div>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {/* <Link
            className="flex items-center cursor-default selection:bg-transparent"
            href="/"
          >
            <HiveIcon className="w-8" />
            <h1 className={cn("text-2xl font-bold text-[#fec748]", "ml-2")}>
              Probee
            </h1>
          </Link> */}
      </div>

      <Link href="/api/logout" title="Sign out">
        <div
          className={cn(
            "text-xl font-semibold text-neutral-300",
            "hover:text-neutral-100",
            "flex items-center cursor-pointer selection:bg-transparent"
          )}
        >
          {lang.sign_out}
        </div>
      </Link>
    </nav>
  );
}
