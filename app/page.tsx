// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ButtonGame from './components/defaults/ButtonGame';
import StarBorder from '@/components/StarBorder';


export default function SplashPage() {
  const router = useRouter();

  const handleEnterSite = () => {
    router.push('/Home');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
                  className=" absolute w-full h-full object-cover inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/lufy.mp4" />
                </video>{" "}

      <div className="absolute bottom-10 w-full flex justify-center">
        <StarBorder
                          as="button"
                          className="custom-class bg-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition animate-bounce "
                          color="cyan"
                          speed="2s"
                          onClick={handleEnterSite}

                        >
                           Let's go in

                        </StarBorder>
        {/* <button
          onClick={handleEnterSite}
          className="bg-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition animate-bounce"
        >
          Let's go in
        </button> */}
        
        
      </div>
      
          <div id='done2' className="mt-5 ml-5 gap- animate-pulse">
            <ButtonGame className='text-red-600 font-bold' link="/login" text="Login" />
            <ButtonGame className='text-red-600 font-bold' link="/signup" text="Sign up" />
          </div>
      {/* <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee ">
        <img src="/fbc.jpg" alt="Lufy" className="absolute w-32 h-32 object-cover opacity-50" />
      </div>
      <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee2 ">
        <img src="/fbc.jpg" alt="Lufy" className="absolute w-32 h-32 object-cover opacity-50" />
      </div>
      <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee3 ">
        <img src="/fbc.jpg" alt="Lufy" className="absolute w-32 h-32 object-cover opacity-50" />
      </div>
      <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee4 ">
        <img src="/fbc.jpg" alt="Lufy" className="absolute w-32 h-32 object-cover opacity-50" />
      </div> */}
    </div>
  );
}

























// import { getGamesByIds, searchGames } from "@/app/api/api";
// import GamesSlider from "../components/GamesSlider";
// import Hero from "../components/Hero";


// export default async function Home() {
//   const data = await searchGames("", 2, [], 50);

//   const ps5 = await searchGames("", 1,
//     [
//       { filterName: "platforms", option: "187" },
//       { filterName: "ordering", option: "-metacritic" },
//     ],
//     50
//   );

//   const pc = await searchGames("", 1, [{ filterName: "platforms", option: "4" }], 50);

//   const { results } = data.data;
//   const customGames = await getGamesByIds(["3841", "49", "1256", "423947", "58597", "3636"]);
//   const NewGames = await getGamesByIds(["981791", "554786", "35814", "16944", "3272", "5583"]);
  
//   return (
//     <section>
//       <Hero />
      
//       <GamesSlider title="Top Games PS5" games={ps5.data.results} /> 
//       <GamesSlider title="Top Games" games={results} />
//       <GamesSlider screenBig big slidesPerView={2} title="PLAYSTATION" games={customGames.map((game) => game.data)} />
//       <GamesSlider slidesPerView={4} title="Top PC Games" games={pc.data.results} />
//       <GamesSlider slidesPerView={3} title="Various Games" games={ps5.data.results} />
//       <GamesSlider screenBig big slidesPerView={1} title="New Releases" games={NewGames.map((game) => game.data)} />
//       <GamesSlider slidesPerView={2} title="Top PC Games" games={pc.data.results} />
      

//     </section>
//   );
// }
