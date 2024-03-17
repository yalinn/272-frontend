import { LangType } from "@/lang";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SheetBar from "./SheetBar";
export default function NavBar({
  lang,
  paths,
}: {
  lang: LangType;
  paths: { route: string; name: string }[];
}) {
  return (
    <nav
      className={cn(
        "flex lg:px-64 items-center justify-between w-full p-8",
        "border-b border-gray-300/30"
      )}
    >
      <div className="flex">
        <SheetBar
          lang={lang}
          paths={paths}
        />
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
