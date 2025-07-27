import connect from "@/lib/connect";
import GameReview from "@/app/models/review";

export async function getReviews(gameId: string) {
  await connect();
  const reviews = await GameReview.find({ gameId }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(reviews));
}
