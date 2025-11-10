// "use client";

// import { useEffect, useState } from "react";
// import NewPostForm from "@/app/components/community/NewPsotForm";
// import PostCard from "@/app/components/community/PostCard";
// import { useCommunityStore, IPost } from "@/lib/communityStore";

// export default function CommunityPage() {
//     const { posts, fetchPosts, addPost } = useCommunityStore();
//     const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null);

//     useEffect(() => {
//         // جلب المستخدم الحالي من الكوكيز/API
//         fetch("/api/me")
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data?._id) setCurrentUser({ id: data._id, name: data.name });
//             });
//         fetchPosts();
//     }, []);

//     const handleNewPost = (text: string) => {
//         if (!currentUser) return;
//         addPost(currentUser.id, text);
//     };

//     if (!currentUser) return <div>جارٍ تحميل بيانات المستخدم...</div>;

//     return (
//         <div className="max-w-xl mx-auto p-4 space-y-4">
//             <NewPostForm user={currentUser} onAddPost={handleNewPost} />
//             {posts.map((post: IPost) => (
//                 <PostCard key={`${post._id}-${post.postIndex}`} post={post} currentUserId={currentUser.id} />
//             ))}
//         </div>
//     );
// }
