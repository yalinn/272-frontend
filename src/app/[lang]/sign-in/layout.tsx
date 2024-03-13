import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProBee Çankaya Portalı",
  description: "Seng272 Proje Ödevi",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tr" }];
}
export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <body className={cn(inter.className, "bg-hexagon")}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-gray-800/90">
          {children}
        </main>
      </body>
    </html>
  );
}
