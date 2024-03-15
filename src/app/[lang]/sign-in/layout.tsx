import type { Metadata } from "next";
import "./globals.css";
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
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-[#09090b]">
          {children}
        </main>
      </body>
    </html>
  );
}
