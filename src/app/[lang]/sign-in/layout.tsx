import "./globals.css";

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
        <main className="flex font-bold min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-[#1c1c1c]">
          {children}
        </main>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  return {
    title: params.lang === "en" ? "Sign in to Probee" : "Probee'ye Giriş Yapın",
    description:
      params.lang === "en" ? "Project for Seng272" : "Seng272 Proje Ödevi",
  };
}
