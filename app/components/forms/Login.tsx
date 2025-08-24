"use client";

import React, { useTransition } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }),
});

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok && result.success) {
          toast.success(result.success);
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          router.push("/Home"); 
        } else {
          toast.error(result.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong, please try again.");
      }
    });
  };

  const backToHome = () => {
    router.push("/Home")
  }

  return (
    <MotionItem
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      initial={{ opacity: 0, y: 100 }}
    >
      <MaxWidthWrapper
        customPadding="py-14"
        className="flex flex-col gap-4 items-center w-full bg-black/40 rounded-2xl border border-input relative"
      >
        <div className="flex">
        <div className=" left-0 top-0 animate-spin flex">
          <img src="./tree.png" alt="osama" className="w-12 h-12 rounded-full" />
        </div>
        <Logo />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="flex w-full flex-col gap-10">
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="capitalize text-base font-semibold flex items-center gap-2">
          <Link className="text-yellow-300 hover:underline" href="/signup">
            Register With Us Now !
          </Link>
          <p className="text-gray-50">➡️ ?! Do not have an account </p>
        </div>
        <div className="bg-green-600 w-24 h-8 rounded-xl flex items-center justify-center absolute bottom-0 animate-pulse ">
          <button onClick={backToHome} className=" "> Home ⬅️ </button>
        </div>
        
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Login;





























// "use client";
// import React, { useTransition } from "react";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import FormInput from "../FormInput";
// import MotionItem from "../defaults/MotionItem";
// import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
// import Logo from "../defaults/Logo";
// import Link from "next/link";
// import { login } from "@/app/actions/auth";
// import { toast } from "react-toastify";
// import { redirect } from "next/navigation";


// const loginSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email" }),
//   password: z.string().min(5, { message: "Password must be at least 5 characters" }),
// });

// const Login = () => {
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       password: "",
//       email: "",
//     },
//   });
//   const [isPending, startTransition] = useTransition();
//   const onSubmit = (data: z.infer<typeof loginSchema>) => {
//     console.log(data);
//     startTransition(async () => {
//       const res = await login(data);
//       console.log(res);
//       if (res.success) {
//         toast.success(res.success);
//         redirect("/");
//       } else toast.error(res.error);
//     });
//   };
//   return (
//     <MotionItem animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} initial={{ opacity: 0, y: 100 }}>
//       <MaxWidthWrapper
//         customPadding={" py-14"}
//         className=" flex flex-col gap-4 items-center w-full bg-slate-900 rounded-2xl border border-input"
//       >
        
//         <Logo />
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  w-full flex-col gap-10">
//             <FormInput name="email" label="Email" type="text" />
//             <FormInput name="password" label="Password" type="password" />
//             <Button disabled={isPending} type="submit">
//               Submit
//             </Button>
//           </form>
//         </Form>
//         <div className="capitalize text-base font-semibold flex items-center gap-2">
//           <p className=" text-gray-50 ">Do not have an account ?!</p>{" "}
//           <Link className=" text-yellow-300 hover:underline" href={"/signup"}>
//             Register With Us Now !
//           </Link>
//         </div>
//       </MaxWidthWrapper>
//     </MotionItem>
//   );
// };

// export default Login;
