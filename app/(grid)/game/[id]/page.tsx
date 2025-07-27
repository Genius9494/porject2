import { getGame } from "@/app/api/api";
import GameDetails from "@/app/components/GameDetails";
import { getReviews } from "@/lib/getReviews";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const id = decodeURIComponent(params.id);
  const game = await getGame(id);

  const { screenshots,
    data,
    similar,
  } = game;

  let reviews = [];
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/reviews/${data.id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      reviews = await res.json();
    }
  } catch (err) {
    console.error("Error while fetching reviews:", err);
  }

  return (
    <GameDetails
      gameData={data}
      screenshots={screenshots}
      similar={similar}
      initialReviews={reviews}
    />
  );
};

export default Page;
