import Image from "next/image";
import getDictionary from "@/lang";
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
  return (
    <div className="flex rounded-3xl flex-col lg:flex-row p-6 m-6">
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
