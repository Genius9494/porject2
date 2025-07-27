"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useWishlist } from "../context/wishlistContext";
import { GiHeartPlus } from "react-icons/gi";
import toast from "react-hot-toast";

const AddToWishList = ({
  gameId,
  plus,
}: {
  gameId: string;
  plus?: boolean;
}) => {
  const { handleAddToWishlist, wishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async () => {
    try {
      setLoading(true);
      const wasInWishlist = wishlist.includes(gameId); // ✅ نأخذ القيمة قبل التغيير

      await handleAddToWishlist(gameId); // ✅ تحديث الـ localStorage أو المستخدم

      toast.success(
        wasInWishlist
          ? "Game removed from wishlist"
          : "Game added to wishlist",
        {
          style: {
            background: "rgba(0, 0, 0, 1)",
            color: wasInWishlist ? "red" : "green",
            fontWeight: "bold",
            fontSize: "15px",
            borderRadius: "10px",
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong!",{
        style:{
          color:"white",
          background:"yellow"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = wishlist.includes(gameId); // ✅ الآن هذا يعيد القيمة الحقيقية بعد التحديث

  if (plus) {
    return isInWishlist ? (
      <MdDeleteForever
        style={{ width: "25px", height: "25px", marginTop: "6px" }}
        onClick={toggleWishlist}
        className="text-red-500 cursor-pointer"
        aria-label="Remove from Wishlist"
      />
    ) : (
      <GiHeartPlus
        style={{ width: "25px", height: "25px", marginTop:"6px" }}
        onClick={toggleWishlist}
        className="text-green-500 cursor-pointer"
        aria-label="Add to Wishlist"
      />
    );
  }

  return (
    <Button className="capitalize" onClick={toggleWishlist} disabled={loading}>
      {loading
        ? "Processing..."
        : isInWishlist
          ? "Remove from wishlist"
          : "Add to wishlist"}
    </Button>
  );
};

export default AddToWishList;

