"use client";
import React, { useEffect } from "react";
import * as Form from "@radix-ui/react-form";

const langs = {
  en: {
    title: "Title",
    suggestion: "Suggestion",
    submit: "Submit",
    no_title: "Please enter a title",
    no_suggestion: "Please enter a suggestion",
    success_submit: "Submit successful!",
  },
  tr: {
    title: "Başlık",
    suggestion: "Öneri",
    submit: "Gönder",
    no_title: "Lütfen bir başlık girin",
    no_suggestion: "Lütfen bir öneri girin",
    success_submit: "Gönderme başarılı!",
  },
};

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/lib/ui/button";
import { cn } from "@/lib/utils";
const SuggestForm = ({
  language,
  setOpen,
}: {
  language: string;
  setOpen: (...args: any) => void;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const [errs, setErrs] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    const res = await fetch(`/api/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setLoading(false);
      return res.json();
    });
    if (res.length) {
      setOpen(false);
      setErr("");
      document.location.reload();
    }
    if (Object.keys(res).length !== 0) {
      setErrs(() => Object.keys(res));
      setErr(res.error);
    } else {
      setOpen(false);
      setErr("");
    }
  };
  const lang = language === "en" ? langs.en : langs.tr;
  return (
    <Form.Root className="grid gap-4 py-4">
      <Form.Field className="FormField" name="title">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
          className=""
        >
          <Form.Label className="FormLabel">{lang.title}</Form.Label>
          <Form.Message className=" " match="valueMissing">
            {lang.no_title}
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="bg-white/10 border w-full border-white/20 rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("title", { required: true, maxLength: 50 })}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="content">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
          className=""
        >
          <Form.Label className="FormLabel">{lang.suggestion}</Form.Label>
          <Form.Message className=" " match="valueMissing">
            {lang.no_suggestion}
          </Form.Message>
        </div>
        <Form.Control asChild required={true}>
          <textarea
            className="bg-white/10 border w-full border-white/20 rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("content", { required: true, maxLength: 50 })}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit
        className="w-full bg-blue-500 text-white rounded-md p-2"
        asChild
      >
        <Button
          type="submit"
          className={cn(
            loading || err == "" ? "cursor-not-allowed" : "cursor-pointer",
            "rounded-xl transition-colors duration-300 ease-in-out"
          )}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? (
            <div id="loading" className="w-8 h-8"></div>
          ) : (
            <div>{err == "" ? lang.success_submit : lang.submit}</div>
          )}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default SuggestForm;
