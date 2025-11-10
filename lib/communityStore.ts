// "use client";

// import { create } from "zustand";

// export interface IPost {
//   _id: string;
//   text: string;
//   likes: number;
//   date: string;
//   userId: string;
//   userName: string;
//   postIndex: number;
//   likedBy: string[];
// }

// interface CommunityState {
//   posts: IPost[];
//   fetchPosts: () => Promise<void>;
//   addPost: (userId: string, text: string) => Promise<IPost | null>;
//   likePost: (userId: string, postUserId: string, postIndex: number) => Promise<void>;
// }

// export const useCommunityStore = create<CommunityState>((set, get) => ({
//   posts: [],

//   fetchPosts: async () => {
//     try {
//       const res = await fetch("/api/posts");
//       if (!res.ok) return;
//       const data = await res.json();
//       set({ posts: data });
//     } catch (error) {
//       console.error("Failed to fetch posts:", error);
//     }
//   },

//   addPost: async (userId, text) => {
//     try {
//       const res = await fetch("/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, text }),
//       });
//       if (!res.ok) return null;
//       const data = await res.json();
//       set({ posts: [data, ...get().posts] });
//       return data;
//     } catch (error) {
//       console.error("Failed to add post:", error);
//       return null;
//     }
//   },

//   likePost: async (currentUserId, postUserId, postIndex) => {
//     try {
//       const res = await fetch(`/api/posts/${postUserId}/${postIndex}/like`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: currentUserId }),
//       });
//       if (!res.ok) {
//         const text = await res.text();
//         console.error("Failed to like post:", res.status, text);
//         return;
//       }
//       // تحديث لحظي
//       const updatedPosts = get().posts.map((p) => {
//         if (p.userId === postUserId && p.postIndex === postIndex) {
//           const liked = p.likedBy.includes(currentUserId);
//           return {
//             ...p,
//             likes: liked ? p.likes - 1 : p.likes + 1,
//             likedBy: liked
//               ? p.likedBy.filter((id) => id !== currentUserId)
//               : [...p.likedBy, currentUserId],
//           };
//         }
//         return p;
//       });
//       set({ posts: updatedPosts });
//     } catch (error) {
//       console.error("Failed to like post:", error);
//     }
//   },
// }));
