"use client";

import { useCommunityStore } from "@/lib/communityStore";

interface PostProps {
    post: {
        _id?: string;
        text: string;
        likes: number;
        date: string;
        userName?: string;
        userId?: string;
    };
}

export default function PostCard({ post }: PostProps) {
    const { posts, fetchPosts } = useCommunityStore();

    const handleLike = async () => {
        if (!post._id) return;
        // يمكن لاحقًا إضافة endpoint لزيادة الإعجابات
        console.log("Liked post", post._id);
        // مؤقت: إعادة تحميل البوستات
        await fetchPosts();
    };

    return (
        <div className="bg-purple-900/40 p-4 rounded-xl mb-3 text-white">
            <p>{post.text}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-300">
                <span>
                    {post.userName ? `@${post.userName} • ` : ""}
                    {new Date(post.date).toLocaleString()}
                </span>
                <button onClick={handleLike}>❤️ {post.likes}</button>
            </div>
        </div>
    );
}
