"use client";

import React from "react";
import { toast } from "react-toastify";

type BuyButtonProps = {
  name: string;   // اسم المنتج
  price: number;  // السعر بالدولار
};

const BuyButton: React.FC<BuyButtonProps> = ({ name, price }) => {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // نرسل السعر بالدولار — السيرفر سيحوّله للسنت
        body: JSON.stringify({ name, price }),
      });


      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        toast("حدث خطأ أثناء إنشاء جلسة الدفع. جرّب لاحقاً.");
        return;
      }


      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url; // تحويل لصفحة الدفع
      } else {
        console.error("No checkout URL in API response:", data);
      }
    } catch (error) {
      console.error("Error during checkout request:", error);
      alert("تعذر الاتصال بخدمة الدفع.");
    }
  };

  return (
    <button
      onClick={handleBuy}
      style={{ width: "75%" }}
      className="bg-green-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl mt-6 h-10 animate-pulse delay-75 text-sm"
    >
      Buy with ${(price / 100).toFixed(2)}
    </button>
  );
};

export default BuyButton;
