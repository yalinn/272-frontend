import React from "react";
import { cn } from "@/lib/utils";
import getDictionary from "@/lang";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";
import NavBar from "@/components/Navigation";

import { Arimo } from "next/font/google";
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
export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return getIronSession<{
    token: any;
    user: { roles: string[] };
  }>(cookies(), sessionOptions).then((session) => {
    if (!session.token) {
      return redirect("/sign-in", RedirectType.push);
    }
    if (!session.user) {
      return redirect("/api/logout", RedirectType.push);
    }
    if (!session.user.roles.includes("admin")) {
      return redirect("/", RedirectType.push);
    }
    return children;
  });
}
