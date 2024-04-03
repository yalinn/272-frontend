import type { Metadata } from "next";
import "./globals.css";
import { Arimo } from "next/font/google";

const font = Arimo({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "ProBee Çankaya Portalı",
  description: "Seng272 Proje Ödevi",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <body className={font.className}>{children}</body>
    </html>
  );
}
