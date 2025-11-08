"use client";

import { useEffect } from "react";
import { useCommunityStore } from "@/lib/communityStore";
import NewPostForm from "@/app/components/community/NewPsotForm";
import PostCard from "@/app/components/community/PostCard";

export default function CommunityPage() {
    const { posts, fetchPosts } = useCommunityStore();
    const userId = "PUT_CURRENT_USER_ID_HERE"; // يجب تعيين معرف المستخدم الحالي

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-white mb-6">🎮 Community Zone</h1>
            <NewPostForm userId={userId} />
            {posts.length === 0 ? (
                <p className="text-gray-400 text-center">No posts yet. Be the first!</p>
            ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
            )}
        </div>
    );
}
