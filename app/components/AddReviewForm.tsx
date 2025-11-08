"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const AddReviewForm = ({ gameId }: { gameId: string }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, rating, comment }),
            cache: "no-store"
        });

        if (res.ok) {
            toast.success("Review added successfully!");
            setComment("");
        } else {
            toast.error("Failed to add review");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label className="block text-sm font-medium">Rating (1–5)</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(+e.target.value)}
                    min={1}
                    max={5}
                    className="w-full rounded-md border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Your Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-md border p-2"
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Submit Review
            </button>
        </form>
    );
};

export default AddReviewForm;
