// components/CommentForm.tsx
"use client";
import { useState } from "react";

export default function CommentForm({
    gameId,
    userId,
    onNewComment,
}: {
    gameId: string;
    userId: string;
    onNewComment: (comment: any) => void;
}) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const submitComment = async () => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/api/comments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    gameId,
                    userId,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setContent('');
                onNewComment(data); // ✅ أضف التعليق مباشرة للمراجعات
            } else {
                console.error("Faild To Sent a Comment");
            }
        } catch (error) {
            console.error("Somthing Went Wrong", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2 mt-6">
            <textarea
                className="w-full p-2 border rounded"
                placeholder="Add Your Comment Here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                onClick={submitComment}
                disabled={loading || content.trim() === ""}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Sending..." : "Send a Comments"}
            </button>
        </div>
    );
}
