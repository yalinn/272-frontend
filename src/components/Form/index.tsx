"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
import "./styles.css";

const langs = {
  en: {
    title: "Edit your profile",
    desctiption:
      "Make changes to your profile here. Click save when you're done.",
    submit: "Log in",
    im_a_teacher: "I'm a teacher",
    im_a_student: "I'm a student",
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
        label: "Password",
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
    submit: "Giriş Yap",
    im_a_teacher: "Öğretim görevlisiyim",
    im_a_student: "Öğrenciyim",
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
import { Switch } from "@/lib/ui/switch";
const FormDemo = ({ language }: { language: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [err, setErr] = React.useState<string | null>(null);
  const [isStudent, setIsStudent] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    data.user_type = isStudent ? "student" : "teacher";
    const res = await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setLoading(false);
      return res.json();
    });
    if (res.token) {
      setErr("");
      window.location.reload();
    } else {
      setErr(res.message);
    }
  };
  const lang = language === "en" ? langs.en : langs.tr;
  return (
    <Form.Root className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="flex dark:text-neutral-300 items-center col-span-4 space-x-2 w-full justify-center">
          <span
            className={cn(
              isStudent
                ? "bg-[#fec748] dark:text-neutral-900"
                : "dark:text-neutral-300 bg-neutral-500/10",
              "p-2 rounded-xl transition-colors duration-300 ease-in-out font-light text-sm"
            )}
          >
            {lang.im_a_student}
          </span>
          <Switch id="airplane-mode" onClick={() => setIsStudent((s) => !s)} />
          <span
            className={cn(
              isStudent
                ? "bg-neutral-500/10"
                : "bg-[#fec748] dark:text-neutral-900",
              "p-2 rounded-xl transition-colors duration-300 ease-in-out font-light text-sm"
            )}
          >
            {lang.im_a_teacher}
          </span>
        </div>
      </div>
      {lang.inputs.map((input, index) => (
        <Form.Field
          className="grid grid-cols-4 items-center gap-4"
          name={input.id}
          key={input.id}
          typeof={input.type || "text"}
        >
          <Form.Label className="text-right text-[#fec748] w-full text-xs md:text-sm">
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
          <Form.Submit className="w-full text-black rounded-md p-2" asChild>
            <Button
              type="submit"
              variant={"honey"}
              className="cursor-pointer rounded-xl transition-colors duration-300 ease-in-out"
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? (
                <div id="loading" className="w-8 h-8"></div>
              ) : (
                <div>{err == "" ? "Giriş Başarılı!" : lang.submit}</div>
              )}
            </Button>
          </Form.Submit>
          {err && (
            <div className="absolute -bottom-3 -left-3 text-red-500 bg-[#09090b]/70 p-2 rounded-2xl text-right">
              {err}
            </div>
          )}
        </div>
      </div>
    </Form.Root>
  );
};

export default FormDemo;
