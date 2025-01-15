"use client";
import { Calendar } from "@/lib/ui/calendar"
import React from "react";
import { HaysevDialog } from "@/components/HaysevDialog";
import { useEffect, useState } from "react";
import { HaysevRequest } from "@/@types/base";
export default function Home({ params }: { params: { lang: string } }) {
    const [data, setData] = useState<HaysevRequest[]>(Array<HaysevRequest>(10).fill({
        id: "",
        status: "processing",
        title: "",
        description: "",
        start_time: "",
        organizer_id: "",
        author: "",
        created_at: "",
        isMine: false
    } as HaysevRequest));
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dialogData, setDialogData] = useState<HaysevRequest[] | null>(null);
    async function fetchSuggestions() {
        const data = await fetch("/api/haysev", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        console.log({ data });
        setData(
            data?.sort(
                (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            ) || []
        );
        return data;
    }
    useEffect(() => {
        fetchSuggestions();
    }, []);
    function onSelect(date: Date | undefined) {
        if (!date) return;
        setDate(date);
        if (data.map((d) => new Date(d.start_time)).map(d => new Date(d.setHours(0, 0, 0, 0)).toString()).includes(date.toString())) {
            let selected = data.filter((d) => new Date(new Date(d.start_time).setHours(0, 0, 0, 0)).getTime() == date.getTime());
            setDialogData(selected);
        } else {
            setDialogData(null);
        }
        setOpen(true);
    }
    function sendSubmit() {
        fetch("/api/haysev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ start_time: date }),
        }).then(() => {
            setOpen(false);
            alert("Başvuurunuz alınmıştır.");
            fetchSuggestions();
        })
    }
    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full gap-2 overflow-visible overscroll-y-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        className="w-full justify-center flex"
                        daylist={data.map((d) => new Date(d.start_time))}
                        mylist={data.filter((d) => d.isMine).map((d) => new Date(d.start_time))}
                    />
                    <HaysevDialog
                        open={open}
                        setOpen={setOpen}
                        data={dialogData}
                        date={date}
                        submit={sendSubmit}
                    />
                </div>
            </div>
        </div>
    );
}



