"use client";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";
import MotionItem from "../defaults/MotionItem";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import Link from "next/link";
import { FileUploadDemo } from "../FileUpload";
import { signup } from "@/app/actions/auth";
import { toast } from "react-toastify";
import CountryInput from "./CountryInput";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";







const singupSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }),
    name: z.string().min(5, { message: "Name must be at least 5 characters" }),
    avatar: z
      .any()
      .refine((files) => !files || files.length === 1, "يرجى اختيار صورة واحدة فقط")
      .optional(),

    confirmPassword: z.string().min(5, { message: "Password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Singup = () => {
  const form = useForm<z.infer<typeof singupSchema>>({
    resolver: zodResolver(singupSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
      confirmPassword: "",
      avatar: undefined, // أو avatar: undefined
    },
  });


  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof singupSchema>) => {
    startTransition(async () => {
      try {
        let avatar;

        if (data.avatar && data.avatar[0]) {
          const formData = new FormData();
          formData.append("file", data.avatar[0]);
          formData.append("upload_preset", "ml_default");

          const res = await fetch("https://api.cloudinary.com/v1_1/dxaj2hoal/image/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Cloudinary Error:", errorResponse);
            toast.error("فشل في رفع الصورة");
            return;
          }

          const cloudinaryData = await res.json();

          avatar = {
            secure_url: cloudinaryData.secure_url,
            public_id: cloudinaryData.public_id,
          };
        }

        const signupPayload = {
          email: data.email,
          password: data.password,
          name: data.name,
          avatar,
        };


        const response = await signup(signupPayload);
        console.log("Signup response:", response); // ✅ safe

        if (response?.success) {
          toast.success(response.success);
          router.push("/login");
        } else {
          toast.error(response?.error || "فشل في إنشاء الحساب");
        }
      } catch (error) {
        console.error("Signup Error:", error);
        toast.error("حدث خطأ أثناء إنشاء الحساب");
      }
    });
  };


  const [role, setRole] = useState<"user" | "admin">("user"); // القيمة الافتراضية user
  const backToHome = () => {
    router.push("/Home")
  }

  return (
    <MotionItem animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}>
      <MaxWidthWrapper
        customPadding={" py-14"}
        className=" flex flex-col gap-4 items-center  w-full bg-black/60 rounded-2xl border border-input relative"
      >

        <div className="flex">
          <div className=" left-0 top-0 animate-spin flex">
            <img src="./tree.png" alt="osama" className="w-12 h-12 rounded-full" />
          </div>
          <Logo />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  w-full flex-col gap-6">
            <FileUploadDemo name="avatar" />
            <FormInput name="name" label="Name" type="text" />
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />{" "}
            <FormInput name="confirmPassword" type="password" label="Confirm Password" />
            {/* <CountryInput /> */}

            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="capitalize text-base font-semibold flex items-center gap-2">
          <Link className=" text-rose-500 hover:underline" href={"/login"}>
            Login In to Your Account
          </Link>
          <p className="  text-gray-50 ">?! Already Have An Account </p>{" "}
        </div>
        <div className="bg-green-600 w-24 h-8 rounded-xl flex items-center justify-center absolute bottom-0 animate-pulse ">
          <button onClick={backToHome} className=" "> Home </button>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Singup;