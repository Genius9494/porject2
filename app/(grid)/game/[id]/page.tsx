import { getGame } from "@/app/api/api";
import GameDetails from "@/app/components/GameDetails";
import { getReviews } from "@/lib/getReviews";
import { getGameDetails } from "@/lib/raw";

interface PageProps {
  params: {
    id: string
  };
}

export default async function Page({ params }: PageProps) {
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
      gameData={JSON.parse(JSON.stringify(data))}
      screenshots={screenshots}
      similar={similar}
      initialReviews={reviews}
    />

  );
};

{/* <GameDetails
  gameData={JSON.parse(JSON.stringify(data))}

  // gameData={data}
  screenshots={screenshots}
  similar={similar}
  initialReviews={reviews}
  developers={data.developers}
  publishers={data.publishers}
  achievements_count={data.achievements_count}
  name={data.name}
  community_rating={data.community_rating}
  clip={data.clip}
/> */}



