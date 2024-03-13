import Image from "next/image";
import HiveIcon from "@/assets/svg/HiveIcon";
import { DialogDemo } from "@/components/JoinDialog";
import { cn } from "@/lib/utils";
import getDictionary, { LangType } from "@/lang";
import FormDemo from "../../../components/Form";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions } from "@/lib/constants";

export default async function Home({ params }: { params: { lang: string } }) {
  const session = await getIronSession<{ token: any }>(
    cookies(),
    sessionOptions
  );
  if (session.token) {
    redirect("/");
  }
  const lang = await getDictionary(params.lang);
  return (
    <div className="flex rounded-3xl flex-col lg:flex-row bg-white/80 p-6 m-6">
      <Image
        className="self-center p-4"
        src={"/assets/logo.png"}
        alt="Cankaya University Probee Application"
        width={200}
        height={200}
      />
      <div className="flex">
        <FormDemo language={params.lang} />
      </div>
    </div>
  );
}
