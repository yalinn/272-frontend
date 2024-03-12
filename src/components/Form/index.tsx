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
        valueMissing: "Please enter your username",
        alreadyExists: "This username already exists",
        type: "text",
      },
      {
        label: "Parola",
        id: "password",
        defaultValue: "",
        valueMissing: "Please enter your password",
        alreadyExists: "This password already exists",
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
        valueMissing: "Lütfen kullanıcı adınızı girin",
        alreadyExists: "Bu kullanıcı adı zaten mevcut",
        type: "text",
      },
      {
        label: "Parola",
        id: "password",
        defaultValue: "",
        valueMissing: "Lütfen parolanızı girin",
        alreadyExists: "Bu parola zaten mevcut",
        type: "password",
      },
    ],
  },
};

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/lib/ui/button";
const FormDemo = ({
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
  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await fetch(`/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (res.token) {
      setOpen(false);
      document.location.reload();
    }
    if (Object.keys(res).length !== 0) {
      setErrs(() => Object.keys(res));
    } else {
      setOpen(false);
    }
  };
  const lang = language === "en" ? langs.en : langs.tr;
  return (
    <Form.Root className="grid gap-4 py-4">
      {lang.inputs.map((input, index) => (
        <Form.Field
          className="grid grid-cols-4 items-center gap-4"
          name={input.id}
          key={input.id}
          typeof={input.type || "text"}
        >
          <Form.Label className="text-right w-full text-xs md:text-sm">
            {input.label}
          </Form.Label>
          <div className="flex flex-col col-span-3 h-full justify-center relative">
            <Form.Control asChild>
              <input
                className=" bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register(input.id, {
                  required: true,
                  maxLength: 40,
                })}
                {...input}
              />
            </Form.Control>
            {["username", "email"].some(
              (k) => errs.includes(k) && input.id === k
            ) && (
              <Form.Message className="text-red-600">
                {input.alreadyExists}
              </Form.Message>
            )}
            {errors[input.id] && (
              <Form.Message className="absolute -top-4 text-red-500 text-right">
                {input.valueMissing}
              </Form.Message>
            )}
          </div>
        </Form.Field>
      ))}
      <Form.Submit
        className="w-full bg-blue-500 text-white rounded-md p-2"
        asChild
      >
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          {lang.submit}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormDemo;
