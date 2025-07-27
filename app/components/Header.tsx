"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (res.ok && data?.data) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) return null;

  return (
    <header className="w-full p-4 flex justify-between items-center bg-slate-400 text-yellow-400 shadow-md">
      <div className="flex items-center gap-3">
        <img
          src="/avatar.jpg" // أو user.avatar إذا كان لديك صورة للمستخدم
          alt="User"
          className="w-10 h-10 rounded-full border border-white"
        />
        <h1 className="text-xl font-bold">{user.name || "User"}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-green-400 px-4 py-2 rounded-md text-white"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;




