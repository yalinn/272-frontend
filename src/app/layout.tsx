import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { Roboto } from "next/font/google";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={cn(inter.className, "bg-hexagon")}>{children}</body>
    </html>
  );
}
