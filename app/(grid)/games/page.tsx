import Filters from "@/app/components/Filters";
import Heading from "@/app/components/Heading";

const APIURL = "https://api.rawg.io/api/";
const KEY = process.env.NEXT_PUBLIC_API_KEY; // أو اكتبه مباشرة للتجربة

const page = async () => {
  const res = await fetch(`${APIURL}genres?key=${KEY}`, {
    cache: "no-store", // حتى لا يخزن البيانات في الـ cache
    
  });

  if (!res.ok) {
    console.error("Failed to fetch genres");
    return <p>Error loading genres</p>;
  }

  const data = await res.json();
  const generes = data?.results?.slice(0, 15) || [];

  return (
    <div className="mt-10 relative flex flex-col gap-5">
      <Heading text="Games From Genres" className="" />
      <Filters generes={generes} />
    </div>
  );
};

export default page;
