import type { Metadata } from "next";
import { Roboto } from "next/font/google";
const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "ProBee Çankaya Portalı",
  description: "Seng272 Proje Ödevi",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

import { cn } from "@/lib/utils";
import HiveIcon from "@/assets/svg/HiveIcon";
import getDictionary, { LangType } from "@/lang";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";
import Link from "next/link";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const lang = await getDictionary(params.lang);
  const session = await getIronSession<{ token: any }>(
    cookies(),
    sessionOptions
  );
  if (!session.token) {
    redirect("/sign-in", RedirectType.push);
  }
  return (
    <html lang={params.lang}>
      <body className={cn(inter.className)}>
        <main className="flex min-h-screen flex-col items-center justify-between- dark:bg-[#09090b] bg-[#fbfbfd]">
          <NavBar lang={lang} />
          {children}
        </main>
      </body>
    </html>
  );
}

async function NavBar({ lang }: { lang: LangType }) {
  return (
    <nav
      className={cn(
        "flex lg:px-64 items-center justify-between w-full p-8",
        "dark:bg-[#09090b] bg-[#fbfbfd]",
        "border-b border-gray-300/30"
      )}
    >
      <Link className="flex items-center" href="/">
        <HiveIcon className="w-8" />
        <h1 className={cn("text-2xl font-bold text-[#fec748]", "ml-2")}>
          Probee
        </h1>
      </Link>

      <Link href="/api/logout" title="Sign out">
        <div
          className={cn(
            "text-xl font-semibold text-neutral-300",
            "hover:text-neutral-100",
            "flex items-center cursor-pointer"
          )}
        >
          {lang.sign_out}
        </div>
      </Link>
    </nav>
  );
}
