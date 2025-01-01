"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/lib/ui/button";
import "./style.css";

const langs = {
    en: {
        success_login: "Survey submitted!",
        submit: "Submit survey",
        loading: "Please wait",
    },
    tr: {
        success_login: "Anket gönderildi!",
        submit: "Anketi doldur",
        loading: "Lütfen bekleyin",
    },
};

export default function SuggestionPage({
    params,
}: {
    params: { lang: string };
}) {
    const lang = langs[params.lang == "tr" ? "tr" : "en"];
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    async function fetchData() {
        setLoading(true);
        const data = await fetch("/api/survey", {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            setIsLoaded(true);
            setLoading(false);
            return res.json()
        });
        console.log(data);
        return data;
    }
    return (
        <div className="container mx-auto py-10">
            <Button
                type="submit"
                variant={"honey"}
                className={cn(
                    loading || msg !== "" ? "cursor-not-allowed" : "cursor-pointer",
                    "rounded-xl transition-colors duration-300 ease-in-out"
                )}
                onClick={() => {
                    if (isLoaded || msg !== "") return;
                    fetchData().then((data) => {
                        if (data.message) {
                            setMsg(data.message);
                        }
                    });
                }}
            >
                {loading ? (
                    <div id="loading" className="w-8 h-8"></div>
                ) : (
                    <div>{msg !== "" ? msg : lang.submit}</div>
                )}
            </Button>
            {isLoaded ? (
                <div id="loading" className="w-8 h-8"></div>
            ) : (
                <div>{msg !== "" ? msg : loading ? lang.loading : isLoaded ? lang.success_login : lang.submit}</div>
            )}
        </div >
    );
}
