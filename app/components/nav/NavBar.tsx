"use client";

import React, { useState } from "react";
import Search from "../Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import SkeletonCustom from "../SkeletonCustom";
import { useCart } from "../../store/cartStore";
import { FaCartShopping } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import GameAssistant from "../assistant/GameAssistant";
import StarBorder from "@/components/StarBorder";




const path = () => {
  window.location.href = "/cart";
};

const NavBar = () => {
  const { user, isLoading, isError } = useGetUser();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const queryClient = useQueryClient();


  //({ queryKey: ["user"] })
  //localStorage.removeItem("token");
  //sessionStorage.removeItem("token");
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const data = await res.json();
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      if ("success" in data || data.message) {
        toast.success("Logged out successfully");

        // تصحيح طريقة invalidate و reset queries
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        await queryClient.resetQueries({ queryKey: ['user'] });

        window.location.href = "/login";
      } else {
        toast.error(data.error || "Logout failed");
      }
    } catch {
      toast.error("Something went wrong during logout!");
    }
  };




  if (isLoading) {
    return (
      <nav>
        <header className="flex justify-between items-center">
          <Search />
          <SkeletonCustom circle />
        </header>
      </nav>
    );
  }
  const CollectedCards = () => {
    window.location.href = "/collected"
  }

  const [route, setRoute] = useState("Login")
  const [routing, setRotating] = useState("SignUp")

  const Login = () => {
    setRoute("Loading...")
    window.location.href = "/login"
  }
  const SignUp = () => {
    setRotating("Loading...")
    window.location.href = "/signup"

  }


  return (
    <nav>
      <header className="flex justify-between items-center">
        <Search />
        <GameAssistant />
        <span className="flex items-center gap-2 mr-96 ml-2"> {totalItems} <FaCartShopping onClick={path} className="text-red-500 cursor-pointer" /></span>
        {isLoading ? (
          <div className="mt-auto space-y-2">
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ) : user?.data ? (
          <div className="  space-y-2">

            <div className="flex ml-4">
            <Button onClick={handleLogout} variant="destructive" className="ml-2 font-bold">
              Logout
            </Button>
            <Button onClick={CollectedCards} variant="destructive" className="font-bold ">
              Collected
            </Button>
              </div>



          </div>
        ) : null}

        {isError ? (

          <div>حدث خطأ أثناء تحميل بيانات المستخدم. حاول مرة أخرى.</div>
        ) : user?.data ? (
          <User />
        ) : (

          <div className="Split flex items-center gap-4 ">

                <StarBorder
                  as="button"
                  className="custom-class"
                  color="cyan"
                  speed="2s"
                  onClick={Login}
                >
                  {route}
                </StarBorder>
                <StarBorder
                  as="button"
                  className="custom-class "
                  color="cyan"
                  speed="2s"
                  onClick={SignUp}
                >
                  {routing}
                </StarBorder>

                {/* <button
                  className="bg-[#481c74]  rounded-tr-2xl rounded-bl-xl py-2 px-8   hover:scale-x-110 hover:rounded-tr-none hover:rounded-tl-2xl hover:rounded-bl-none hover:rounded-br-xl duration-200 "
                  onClick={Login}

                >
                  {route} </button>
                <button
                  className="bg-[#481c74] rounded-tr-2xl rounded-bl-xl py-2 px-6  hover:scale-x-110 hover:rounded-tr-none hover:rounded-tl-2xl hover:rounded-bl-none hover:rounded-br-xl duration-200 "
                  onClick={SignUp}
                >
                  {routing} </button> */}
          </div>
        )}

      </header>
    </nav>
  );
};

export default NavBar;
