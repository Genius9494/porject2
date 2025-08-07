import React from "react";
import SwiperCards from "./SwiperCards";
import "swiper/css";
import CardInfo from "./CardInfo";

const Hero = () => {
  return (
    <div className=" h-full mt-8">
      <SwiperCards
        className=" h-[30rem]"
        paginationImages
        items={[
          {
            card: (
              <div className=" flex items-start justify-start w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/fort.mp4" />
                </video>{" "}
                <CardInfo
                  btnClasses=" font-bold text-white bg-green-500 hover:bg-red-400"
                  desc="Fortnite is an online battle royale game where 100 players fight to be the last one standing. Players collect weapons, build structures, and compete in fast-paced action. It also has fun events and creative game modes"
                  title="Epic game"
                  image="/fortnight.png"
                />
              </div>
            ),
            src: "/for2.avif",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full mb-5 object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/mortalkombat2.mp4" />
                </video>
                <CardInfo
                  btnClasses=" font-bold text-white bg-green-500 hover:bg-orange-400"
                  desc="Mortal Kombat is a fighting game where two characters battle each other using punches, kicks, and special moves"
                  title="Combat"
                  image="/mortalkombat.png"
                />
              </div>
            ),
            src: "/mor2.jpg",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/godofwar2.mp4" />
                </video>
                <CardInfo
                  btnClasses=" font-bold text-white bg-green-500 hover:bg-orange-400"
                  desc="God of War is an action-adventure game that follows Kratos, a powerful warrior, on his journey through ancient mythological worlds"
                  title="action"
                  image="/godofwar.png"
                />
              </div>
            ),
            src: "/god2.webp",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/mincraft2.mp4" />
                </video>
                <CardInfo
                  btnClasses="font-bold text-white bg-green-500 hover:bg-orange-400"
                  desc="Minecraft is a sandbox game where players can build and explore their own worlds made of blocks. You can mine resources, craft tools"
                  title="Advanture"
                  image="/mm1.png"
                />
              </div>
            ),
            src: "/min.jpeg",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/amongus2.mp4" />
                </video>
                <CardInfo
                  btnClasses="font-bold text-white bg-green-500 hover:bg-orange-400"
                  desc="Join your crewmates in a multiplayer game of teamwork and betrayal! Play online or over local wifi with 4-10 players as you attempt to hold your spaceship together and return back to civilization"
                  title="Mystery"
                  image="/among.png"
                />
              </div>
            ),
            src: "./amongus.jpg",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="./steam.mp4" />
                </video>
                <CardInfo
                  btnClasses="font-bold text-white bg-green-500 hover:bg-orange-400"
                  desc="PlayerUnknown's Battlegrounds (PUBG) is a competitive battle royale shooter game developed by PUBG Studios and published by KRAFTON"
                  title="Advanture"
                  image="/battleground.png"
                />
              </div>
            ),
            src: "/min.jpeg",
          },
        ]}
      />
    </div>
  );
};

export default Hero;
