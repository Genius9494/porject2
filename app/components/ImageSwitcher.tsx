"use client";
import Image from "next/image";
import { useState } from "react";
import { Game } from "@/types"

type ImageSwitcherProps = {
  game: Game;
  images: { image: string }[];
};

const ImageSwitcher = ({ game, images }: ImageSwitcherProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const { name = "Unknown", description_raw = "", metacritic = null } = game;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex].image}
          alt={`${name} screenshot ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-24 rounded-md overflow-hidden cursor-pointer border ${i === activeIndex ? "border-yellow-500" : "border-transparent"
              }`}
          >
            <Image
              src={img.image}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwitcher;