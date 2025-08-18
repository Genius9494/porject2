// app/blog/page.tsx (Server Component)
import { getAllPosts } from "@/lib/getBlogPosts";
import BlogCarousel from "./BlogCarousel";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";


export const revalidate = 60; // إعادة التوليد كل 60 ثانية

export default function BlogPage() {
  const posts = getAllPosts(); // يشتغل هنا لأنه سيرفر
  return (
    <MaxWidthWrapper className="maxee mt-8 rounded-2xl h-screen">
    <main className="p-8 mx-auto mt-5 rounded-2xl">
      <div className="flex items-center justify-center rounded-3xl h-full relative">
        <h5 className="text-4xl font-bold mb-12  absolute">مقالات الألعاب</h5>
      </div>
      <BlogCarousel posts={posts} />
    </main>
    </MaxWidthWrapper>
  );
}
