import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/blog");



export type BlogPost = {
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  image?: string;
  tags?: string[];
};

export function getAllPosts(): Omit<BlogPost, "content">[] {
  const files = fs.readdirSync(postsDir);

  return files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const filePath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      ...(data as Omit<BlogPost, "content" | "slug">),
      slug,
    };
  });
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(postsDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    ...(data as Omit<BlogPost, "content" | "slug">),
    content,
    slug,
  };
}




// export function imageAll(){
//   const imageLoop = [`
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/batman.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//     <img src={"/allimit.jpg"} alt="osama" className="mb-4 w-[60%] rounded-xl" />,
//   `];
// }

