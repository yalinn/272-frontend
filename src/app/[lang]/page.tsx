import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Image from "next/image";
import { sessionOptions } from "../../lib/constants";
import HiveIcon from "@/assets/svg/HiveIcon";
import { DialogDemo } from "../../components/JoinDialog";
import { cn } from "../../lib/utils";
import getDictionary, { LangType } from "../../lang";

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-100 dark:bg-gray-800/90">
      <NavBar lang={lang} />

      <div></div>

      <Footer />
    </main>
  );
}
async function NavBar({ lang }: { lang: LangType }) {
  const user = await getIronSession(cookies(), sessionOptions);
  return (
    <nav
      className={cn(
        "flex lg:px-64 items-center justify-between w-full p-8",
        "bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-gray-900 dark:to-gray-900/30",
        "border-b border-gray-300/30"
      )}
    >
      <div className="flex items-center">
        <HiveIcon className="w-8" />
        <h1 className={cn("text-2xl font-bold text-amber-300", "ml-2")}>
          Probee
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <DialogDemo lang="tr">
          <div className="p-2 rounded-xl transition-colors duration-500 bg-amber-300 text-zinc-900 hover:bg-amber-400 hover:text-zinc-700 dark:bg-amber-300/80 dark:hover:bg-amber-400/80">
            {lang.nav.sign_in}
          </div>
        </DialogDemo>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Docs{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Find in-depth information about Next.js features and API.
        </p>
      </a>

      <a
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Learn{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Learn about Next.js in an interactive course with&nbsp;quizzes!
        </p>
      </a>

      <a
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Templates{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Explore starter templates for Next.js.
        </p>
      </a>

      <a
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Deploy{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
          Instantly deploy your Next.js site to a shareable URL with Vercel.
        </p>
      </a>
    </div>
  );
}
