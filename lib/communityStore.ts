import { create } from "zustand";

interface Post {
  _id?: string;
  text: string;
  likes: number;
  date: string;
  userName?: string;
  userId?: string;
  postIndex?: number;
}

interface CommunityState {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (userId: string, text: string) => Promise<void>;
  likePost: (userId: string, postIndex: number) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: [],

  fetchPosts: async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Failed to fetch posts:", res.status, text);
        return;
      }
      const data = await res.json().catch(() => []);
      set({ posts: data });
    } catch (err) {
      console.error("❌ fetchPosts exception:", err);
    }
  },

  addPost: async (userId: string, text: string) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Failed to add post:", res.status, errorText);
        return;
      }

      const newPost = await res.json().catch(() => null);
      if (!newPost) {
        console.error("❌ Server did not return valid JSON");
        return;
      }

      set((state) => ({ posts: [newPost, ...state.posts] }));
    } catch (err) {
      console.error("❌ addPost exception:", err);
    }
  },

  likePost: async (userId: string, postIndex: number) => {
    try {
      const res = await fetch(`/api/posts/${userId}/${postIndex}/like`, { method: "POST" });
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Failed to like post:", res.status, text);
        return;
      }

      const data = await res.json();
      set((state) => ({
        posts: state.posts.map((p) =>
          p.userId === userId && p.postIndex === postIndex
            ? { ...p, likes: data.likes }
            : p
        ),
      }));
    } catch (err) {
      console.error("❌ likePost exception:", err);
    }
  },
}));
