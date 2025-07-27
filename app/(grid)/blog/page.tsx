// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/getBlogPosts";

export const revalidate = 60;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main id="distinct" className="p-8 mx-auto mt-5 rounded-2xl ">
      <div id="blog" className="flex items-center justify-center rounded-3xl h-16 ">
      <h5  className="text-4xl font-bold mt-2 ">مقالات الألعاب</h5>
      </div>
      <div>
      <ul className="space-y-6 p-6">
        {posts.map(({ slug, title, publishedAt }) => (
          <li key={slug} className="pb-4">
            <Link href={`/blog/${slug}`}>
              <div className="text-xl text-violet-400 hover:text-pink-500">{title}</div> 
            </Link>
            <p className="text-slate-300 mt-1">{new Date(publishedAt).toLocaleDateString()}</p>
            <hr className="border-pink-300 mt-3" />
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
