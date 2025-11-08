import { getGame } from "@/app/api/api";
import GameDetails from "@/app/components/GameDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const game = await getGame(decodedId);




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
      gameData={JSON.parse(JSON.stringify(data))}
      screenshots={screenshots}
      similar={similar}
      initialReviews={reviews}
      // developers={data.developers}
      // publishers={data.publishers}
      // achievements_count={data.achievements_count}
      // name={data.name}
      // community_rating={data.community_rating}
      // clip={data.clip}
    />

  );
};




