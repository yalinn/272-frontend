import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <main className="flex font-bold min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-[#09090b]">
          {children}
        </main>
      </body>
    </html>
  );
}
