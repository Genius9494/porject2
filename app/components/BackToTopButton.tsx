"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 1500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-14 items-center z-50 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-yellow-600 transition-all animate-bounce duration-1000 "
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 left-5 " />
    </button>
  );
};

export default BackToTopButton;
