"use client";

import { useState } from "react";
import { useCommunityStore } from "@/lib/communityStore";

interface Props {
    userId: string; // يجب تمرير معرف المستخدم الحالي
}

export default function NewPostForm({ userId }: Props) {
    const [text, setText] = useState("");
    const { addPost } = useCommunityStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        await addPost(userId, text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share something with the community..."
                className="w-full bg-purple-900/30 text-white p-3 rounded-xl mb-2 resize-none"
            />
            <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg"
            >
                Post
            </button>
        </form>
    );
}
