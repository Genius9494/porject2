"use client";

import React from "react";
import { FiAward, FiFeather, FiActivity } from "react-icons/fi";
import { GiRoyalLove } from "react-icons/gi";
import { SiHomebridge } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import NavLink from "./NavLink";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/queryFunctions";
import { Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { GrCubes } from "react-icons/gr";
import { FaMicroblog } from "react-icons/fa6";
import BackToTopButton from "../BackToTopButton";



export const NAV_LINKS = [
  { link: "/Home", label: "Home", icon: <SiHomebridge /> },
  { link: "/games", label: "Games", icon: <IoGameController /> },
  { link: "/wishes", label: "Wishes", icon: <GiRoyalLove /> },
  { link: "/ratings", label: "Ratings", icon: <FiActivity /> },
  { link: "/famous", label: "Famous", icon: <FiFeather /> },
  { link: "/free", label: "Free Games", icon: <GrCubes /> },
  { link: "/discount", label: "Discounts section", icon: <FiAward /> },
  { link: "/blog", label: "Blogs", icon: <FaMicroblog /> },
  // { link: "/admin", label: "role", icon: <FiAward /> },
];

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  return (
    <div className="col-span-2">
      <BackToTopButton />
      <div className="py-5 px-7 h-screen sticky inset-0 flex flex-col items-start bg-black/30 text-gray-50">
        <Logo />

        {/* ✅ بعد تسجيل الدخول */}
        {isLoading ? (
          <div className="w-full mb-6 mt-4 space-y-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        ) : user?.data ? (
          <div className="w-full flex items-center gap-3 mb-6 mt-4">
            <img
              src="/avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full border border-white"
              width={40}
              height={40}
              
            />
            <div>
              <p className="font-bold text-white text-lg">Genius</p>
              <p className="text-sm text-gray-400">{user.data.email}</p>
            </div>
          </div>
        ) : null}

        
        {NAV_LINKS.map((navLink, i) => (
          <NavLink key={i} navLink={navLink} />
        ))}

        
        {isLoading ? (
          <div className="mt-auto space-y-2">
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ) : user?.data ? (
          <div className="mt-auto w-full space-y-2">
            
            <NavLink
              navLink={{
                link: "/settings",
                label: "Settings",
                icon: <Settings />,
              }}
            />
            
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;

