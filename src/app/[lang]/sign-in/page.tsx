import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Image from "next/image";
import { sessionOptions } from "@/lib/constants";
import HiveIcon from "@/assets/svg/HiveIcon";
import { DialogDemo } from "@/components/JoinDialog";
import { cn } from "@/lib/utils";
import getDictionary, { LangType } from "@/lang";
import FormDemo from "../../../components/Form";

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 dark:bg-gray-800/90">
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
    </main>
  );
}
