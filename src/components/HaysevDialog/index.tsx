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
import { HaysevRequest } from "@/@types/base";

export function HaysevDialog({
  open,
  setOpen,
  data,
  date,
  submit,
}: {
  open: boolean;
  setOpen: (...args: any) => void;
  data: HaysevRequest[] | null;
  date: Date;
  submit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogClose asChild />
      <DialogContent /* className="sm:max-w-[425px]" */>
        {data && <DialogHeader>
          <DialogTitle>{!data.find(d => d.isMine) ? "Görevli Kişi(ler):" : "Zaten Üstlenmişsin"}</DialogTitle>
          <DialogDescription>{!data.find(d => d.isMine) ?
            `${date.toLocaleDateString()} tarihinde ${data.length} kişi beslenmeyi üstlenmiş.`
            : `${date.toLocaleDateString()} tarihinde beslenmeyi üstlenen ${data.length} kişi Arasındasın.`}</DialogDescription>
        </DialogHeader> || <DialogHeader>
            <DialogTitle>{"Hemen Üstlen!"}</DialogTitle>
            <DialogDescription>{`${date.toLocaleDateString()} tarihi için kimse beslemeyi üstlenmemiş`}</DialogDescription>
          </DialogHeader>}
        {/* {data?.map((item) => (
          <div key={item.id} className="flex justify-between">
            <p>{item.author}</p>
          </div>
        ))} */}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>{data ? "Kapat" : "Vazgeç"}</Button>
          {(!data || !data.find(d => d.isMine)) && <Button onClick={submit}>{data ? "Katıl" : "Üstlen"}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
