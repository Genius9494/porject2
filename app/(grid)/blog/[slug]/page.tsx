import { getPostBySlug, getAllPosts, BlogPost } from "@/lib/getBlogPosts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { string } from "zod";

export function imageAll() {
  [
    <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
    <img src={"/batman.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
    
  ];
  }
  

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post: BlogPost = getPostBySlug(params.slug);
  return (
    <article id="distinct" className="p-8 mx-auto mt-5 rounded-2xl relative">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
      {/* <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" /> */}
      <ReactMarkdown>{post.content}</ReactMarkdown >
    </article>
  );
}






