// "use client";

// import React from "react";
// import { IPost, useCommunityStore } from "@/lib/communityStore";

// interface PostCardProps {
//     post: IPost;
//     currentUserId: string;
// }

// export default function PostCard({ post, currentUserId }: PostCardProps) {
//     const { likePost } = useCommunityStore();

//     const handleLike = () => {
//         likePost(currentUserId, post.userId, post.postIndex);
//     };

//     const hasLiked = post.likedBy.includes(currentUserId);

//     return (
//         <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
//             <div className="font-semibold text-lg">{post.userName}</div>
//             <div className="mt-2 text-gray-700">{post.text}</div>
//             <div className="mt-2 flex items-center space-x-4">
//                 <button
//                     onClick={handleLike}
//                     className={`px-3 py-1 rounded-md font-semibold ${hasLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//                         }`}
//                 >
//                     👍 {post.likes}
//                 </button>
//             </div>
//         </div>
//     );
// }
