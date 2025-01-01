import { LangType } from "@/lang";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SheetBar from "./SheetBar";
import { Button } from "@/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { User } from "@/@types/base";

export default async function NavBar({
  lang,
  paths,
  user,
}: {
  lang: LangType;
  paths: { route: string; name: string }[];
  user: User;
}) {
  return (
    <nav
      className={cn(
        "flex lg:px-64 items-center justify-between w-full p-8",
        "border-b border-gray-300/30"
      )}
    >
      <div className="flex">
        <SheetBar lang={lang} paths={paths} />
      </div>

      <div
        className={cn(
          "text-xl font-semibold text-neutral-300",
          "hover:text-neutral-100 w-8 h-8",
          "flex items-center cursor-pointer selection:bg-transparent",
          "hover:bg-amber-500/25",
          "items-center justify-center"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex flex-col items-end">
              <span className="text-lg shrink-0 items-end text-right">
                {"Menü"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{lang["user_panel"]}</DropdownMenuLabel>
            <DropdownMenuItem>
              {user.full_name}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {
                /* @ts-ignore */
                lang.departments[user.department]
              }
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/api/logout">
              <DropdownMenuItem className="p-2 text-red-500 hover:text-red-300 w-full duration-300">
                {lang["sign_out"]}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
