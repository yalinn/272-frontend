import "./globals.css";

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
  return <html lang={params.lang}>{children}</html>;
}
