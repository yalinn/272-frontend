import React from "react";
import { cn } from "@/lib/utils";
import getDictionary from "@/lang";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";
import NavBar from "@/components/Navigation";

import { Arimo } from "next/font/google";
import { User } from "@/@types/base";
const font = Arimo({ subsets: ["latin"], weight: ["400", "700"] });
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  return {
    title: params.lang === "en" ? "Probee Application" : "Probee Uygulaması",
    description:
      params.lang === "en"
        ? "Çankaya University Probee Application"
        : "Çankaya Üniversitesi Probee Uygulaması",
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const session = await getIronSession<{
    token: any;
    user: User
  }>(cookies(), sessionOptions);
  if (!session.token) {
    redirect("/sign-in", RedirectType.push);
  }
  if (!session.user) {
    redirect("/api/logout", RedirectType.push);
  }
  const lang = await getDictionary(params.lang);
  const paths = [{ route: "/", name: lang.route_home }];
  if (session.user.roles.includes("admin")) {
    paths.push({ route: "/suggestions", name: lang.route_suggestions });
  }
  if (!session.user.full_name || session.user.full_name == "") {
    redirect("/api/logout", RedirectType.push);
  }
  return (
    <html lang={params.lang}>
      <body className={cn(font.className)}>
        <main className="flex min-h-screen flex-col items-center justify-between- dark:bg-[#09090b] bg-[#fbfbfd]">
          <NavBar lang={lang} paths={paths} user={session.user} />
          {children}
        </main>
      </body>
    </html>
  );
}
