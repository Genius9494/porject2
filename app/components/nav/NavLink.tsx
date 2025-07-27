"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const NavLink = ({ navLink }: { navLink: { link: string; label: string; icon: ReactElement }}) => {
  const { label, icon } = navLink;
  const pathName = usePathname(); //hook that needs to be in client mode
  const isActive = pathName === navLink.link;
  return (
    <div className="font-bold">
    <Link
      href={navLink.link}
      className={`flex  ${
        isActive ? "  text-yellow-300" : " text-gray-50"
      } hover:text-green-500 hover:skew-x-12 hover:translate-x-5 my-2 duration-200 gap-4 gap-x items-center p-4  rounded-md`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5 text-green-500" })}
      {label}
      
    </Link>
    </div>
  );
};

export default NavLink;
