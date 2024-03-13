"use client";
import React, { useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import "./styles.css";

const langs = {
  en: {
    title: "Edit your profile",
    desctiption:
      "Make changes to your profile here. Click save when you're done.",
    submit: "Submit",
    inputs: [
      {
        label: "Username",
        id: "username",
        defaultValue: "",
        valuemissing: "Please enter your username",
        alreadyexists: "This username already exists",
        type: "text",
      },
      {
        label: "Parola",
        id: "password",
        defaultValue: "",
        valuemissing: "Please enter your password",
        alreadyexists: "This password already exists",
        type: "password",
      },
    ],
  },
  tr: {
    title: "Profilinizi düzenleyin",
    desctiption:
      "Profilinizi buradan düzenleyin. Bittiğinizde kaydet'e tıklayın.",
    submit: "Gönder",
    inputs: [
      {
        label: "Kullanıcı adı",
        id: "username",
        defaultValue: "",
        valuemissing: "Lütfen kullanıcı adınızı girin",
        alreadyexists: "Bu kullanıcı adı zaten mevcut",
        type: "text",
      },
      {
        label: "Parola",
        id: "password",
        defaultValue: "",
        valuemissing: "Lütfen parolanızı girin",
        alreadyexists: "Bu parola zaten mevcut",
        type: "password",
      },
    ],
  },
};

import { SubmitHandler, set, useForm } from "react-hook-form";
import { Button } from "@/lib/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/lib/ui/label";
import { Switch } from "@/lib/ui/switch";
const FormDemo = ({ language }: { language: string }) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const [err, setErr] = React.useState<string | null>(null);
  const [isStudent, setIsStudent] = React.useState(true);
  const onSubmit: SubmitHandler<any> = async (data) => {
    data.user_type = isStudent ? "student" : "teacher";
    const res = await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (res.token) {
      window.location.reload();
    } else {
      setErr(res.message);
    }
  };
  const lang = language === "en" ? langs.en : langs.tr;
  return (
    <Form.Root className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <span className={cn(isStudent ? "text-green-600" : "text-neutral-900")}>
          Öğrenciyim
        </span>
        <div className="flex text-black items-center col-span-3 space-x-2">
          <Switch id="airplane-mode" onClick={() => setIsStudent((s) => !s)} />
          <Label
            htmlFor="airplane-mode"
            className={isStudent ? "" : "text-green-600"}
          >
            Öğretim Görevlisiyim
          </Label>
        </div>
      </div>
      {lang.inputs.map((input, index) => (
        <Form.Field
          className="grid grid-cols-4 items-center gap-4"
          name={input.id}
          key={input.id}
          typeof={input.type || "text"}
        >
          <Form.Label className="text-right text-black w-full text-xs md:text-sm">
            {input.label}
          </Form.Label>
          <div className="flex flex-col col-span-3 h-full justify-center relative">
            <Form.Control asChild>
              <input
                className={cn(
                  " bg-black/50 border border-black/20 rounded-xl px-3 py-2 text-sm ring-offset-white",
                  "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50 first:bg-black/1*"
                )}
                {...register(input.id, {
                  required: true,
                  maxLength: 40,
                })}
                {...input}
              />
            </Form.Control>
            {errors[input.id] && (
              <Form.Message className="absolute -top-4 text-red-500 text-right">
                {input.valuemissing}
              </Form.Message>
            )}
          </div>
        </Form.Field>
      ))}
      <div className="grid grid-cols-4 items-center gap-4">
        <br className="" />
        <div className="flex flex-col col-span-3 h-full justify-center relative">
          <Form.Submit
            className="w-full bg-blue-500 text-black rounded-md p-2"
            asChild
          >
            <Button
              type="submit"
              variant={"ghost"}
              className="cursor-pointer bg-neutral-800 text-white rounded-xl transition-colors duration-300 ease-in-out"
              onClick={handleSubmit(onSubmit)}
            >
              {lang.submit}
            </Button>
          </Form.Submit>
          {err && (
            <div className="absolute -top-4 text-red-500 text-right">{err}</div>
          )}
        </div>
      </div>
    </Form.Root>
  );
};

export default FormDemo;
