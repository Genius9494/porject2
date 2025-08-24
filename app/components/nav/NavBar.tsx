"use client";

import React from "react";
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

  return (
    <nav>
      <header className="flex justify-between items-center">
        <Search />
        <span className="flex items-center gap-2 mr-96"> {totalItems} <FaCartShopping onClick={path} className="text-red-500 cursor-pointer" /></span>
        {isLoading ? (
          <div className="mt-auto space-y-2">
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ) : user?.data ? (
          <div className="  space-y-2">


            <Button onClick={handleLogout} variant="destructive" className="">
              Logout
            </Button>

          </div>
        ) : null}

        {isError ? (

          <div>حدث خطأ أثناء تحميل بيانات المستخدم. حاول مرة أخرى.</div>
        ) : user?.data ? (
          <User />
        ) : (

          <div className="flex items-center">
            <ButtonGame link="/login" text="Login" />
            <ButtonGame link="/signup" text="Sign up" />
          </div>
        )}

      </header>
    </nav>
  );
};

export default NavBar;
