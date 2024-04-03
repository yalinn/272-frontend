"use client";
import { Button } from "@/lib/ui/button";
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
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import FormDemo from "../SuggestForm";
import { use, useEffect, useState } from "react";

const language = {
  en: {
    title: "Suggestion Form",
    desctiption: "Create a suggestion here. Click submit when you're done.",
    submit: "Submit",
  },
  tr: {
    title: "Öneri Formu",
    desctiption: "Burada bir öneri oluşturun. Bittiğinizde gönder'e tıklayın.",
    submit: "Gönder",
  },
};


export function SuggestDialog({
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
      <DialogTrigger>{children}</DialogTrigger>
      <DialogClose asChild />
      <DialogContent /* className="sm:max-w-[425px]" */>
        <DialogHeader>
          <DialogTitle>{lg.title}</DialogTitle>
          <DialogDescription>{lg.desctiption}</DialogDescription>
        </DialogHeader>
        <FormDemo language={lang} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
