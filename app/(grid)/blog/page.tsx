import { getAllPosts } from "@/lib/getBlogPosts";
import BlogCarousel from "./BlogCarousel";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";


export const revalidate = 60; //regenration every 60 seconds

export default function BlogPage() {
  const posts = getAllPosts(); //server
  return (
    <MaxWidthWrapper className="maxee mt-8 rounded-2xl h-screen">
    <main className="p-8 mx-auto mt-5 rounded-2xl">
      <div className="flex items-center justify-center rounded-3xl h-full relative">
          <h5 className="text-4xl font-bold mb-12 skew-x-2 shadow-md  absolute">  Games articles  </h5>
      </div>
      <BlogCarousel posts={posts} />
    </main>
    </MaxWidthWrapper>
  );
}
