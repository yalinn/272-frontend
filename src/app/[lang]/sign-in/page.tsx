import FormDemo from "@/components/Form";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";
import BeeIcon from "@/assets/svg/bee";

export default async function Home({ params }: { params: { lang: string } }) {
  const session = await getIronSession<{ token: any }>(
    cookies(),
    sessionOptions
  );
  if (session.token) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center dark:bg-[#09090b] bg-[#fbfbfd]">
      <span className="flex items-center justify-center w-full">
        {params.lang === "en"
          ? "Çankaya University Probee Application"
          : "Çankaya Üniversitesi Probee Uygulaması"}
      </span>
      <div className="flex rounded-3xl flex-col lg:flex-row m-6 gap-6">
        {/* <HiveIcon
        className="self-center p-4"
        alt="Cankaya University Probee Application"
        width={200}
        height={200}
      /> */}
        <BeeIcon
          fill="#F9E700"
          className="self-center p-4 w-40"
          alt="Cankaya University Probee Application"
        />
        <div className="flex">
          <FormDemo language={params.lang} />
        </div>
      </div>
    </div>
  );
}
