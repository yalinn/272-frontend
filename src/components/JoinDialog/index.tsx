"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import FormDemo from "../Form";
import { use, useEffect, useState } from "react";

const language = {
  en: {
    title: "Sign In",
    desctiption:
      "If you don't have an account, you can check out our ongoing works.",
    submit: "Submit",
    inputs: [
      {
        label: "Username",
        id: "username",
        defaultValue: "",
      },
      {
        label: "Password",
        id: "password",
        defaultValue: "",
      },
    ],
  },
  tr: {
    title: "Giriş Yap",
    desctiption:
      "Hesabınız yoksa, yapılmakta olan çalışmalarımıza göz atabilirsiniz.",
    submit: "Gönder",
    inputs: [
      {
        label: "Kullanıcı adı",
        id: "username",
        defaultValue: "",
      },
      {
        label: "Parola",
        id: "password",
        defaultValue: "",
      },
    ],
  },
};

export function DialogDemo({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [open, setOpen] = useState(false);
  const lg = lang === "tr" ? language.tr : language.en;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogClose asChild />
      <DialogContent /* className="sm:max-w-[425px]" */>
        <DialogHeader>
          <DialogTitle>{lg.title}</DialogTitle>
          <DialogDescription>{lg.desctiption}</DialogDescription>
        </DialogHeader>
        <FormDemo language={lang} setOpen={setOpen} />
        {/* <DialogFooter>
          <Button id="registry" type="submit">
            {lg.submit}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
