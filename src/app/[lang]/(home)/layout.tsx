import { Roboto } from "next/font/google";
const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}

import { cn } from "@/lib/utils";
import getDictionary from "@/lang";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";
import NavBar from "@/components/Navigation";

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
  const lang = await getDictionary(params.lang);
  const session = await getIronSession<{
    token: any;
    user: { roles: string[] };
  }>(cookies(), sessionOptions);
  if (!session.token) {
    redirect("/sign-in", RedirectType.push);
  }
  const paths = [{ route: "/", name: lang.route_home }];
  if (session.user.roles.includes("admin")) {
    paths.push({ route: "/suggestions", name: lang.route_suggestions });
  }
  return (
    <html lang={params.lang}>
      <body className={cn(inter.className)}>
        <main className="flex min-h-screen flex-col items-center justify-between- dark:bg-[#09090b] bg-[#fbfbfd]">
          <NavBar lang={lang} paths={paths} />
          {children}
        </main>
      </body>
    </html>
  );
}
