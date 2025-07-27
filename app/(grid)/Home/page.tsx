import { getGamesByIds, searchGames } from "@/app/api/api";
import GamesSlider from "../../components/GamesSlider";
import Hero from "../../components/Hero";


export default async function Home() {
  const data = await searchGames("", 2, [], 50);

  const ps5 = await searchGames("", 1,
    [
      { filterName: "platforms", option: "187" },
      { filterName: "ordering", option: "-metacritic" }, 
    ],
    50
  );

  

  const pc = await searchGames("", 1, [{ filterName: "platforms", option: "4" }], 50);

  const { results } = data.data;
  const customGames = await getGamesByIds(["3841", "49", "1256", "423947", "58597", "3636"]);
  const NewGames = await getGamesByIds(["981791", "554786", "35814", "16944", "3272", "5583"]);
  
  return (
    <section>
      <Hero />
      
      <GamesSlider title="Top Games PS5" games={ps5.data.results} /> 
      <GamesSlider title="Top Games" games={results} />
      <GamesSlider screenBig big slidesPerView={2} title="PLAYSTATION" games={customGames.map((game) => game.data)} />
      <GamesSlider slidesPerView={4} title="Top PC Games" games={pc.data.results} />
      <GamesSlider slidesPerView={3} title="Various Games" games={ps5.data.results} />
      <GamesSlider screenBig big slidesPerView={1} title="New Releases" games={NewGames.map((game) => game.data)} />
      <GamesSlider slidesPerView={2} title="PC Various Games" games={pc.data.results} />      
      <GamesSlider slidesPerView={5} title="Action Game" games={ps5.data.results} />

    </section>
  );
}
