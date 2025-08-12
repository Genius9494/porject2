"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";


interface SwiperItem {
  key?: string | number;
  card?: React.ReactNode;
  src?: string; // لو تستخدم الصور المصغرة


}


type SlideItem = {
  card: React.ReactNode;
  src: string;
};


const fallbackImage = "/fallback.jpg";

const SwiperCards = ({
  items,
  paginationImages,
  className,
  slidesPerView,
}: {
  items: SlideItem[]; // بدل ما كانت [{key, card}]
  paginationImages?: boolean;
  className?: string;
  slidesPerView?: number;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    swiper?.on("slideChange", () => setProgress(0));
  }, [swiper]);

  return (
    <div className="relative h-full gap-3 w-full flex flex-col">


      {/* home video */}

      <Swiper
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={slidesPerView || 1}
        className={`w-full relative ${className || "h-96"}`}
        onSwiper={(swiper) => setSwiper(swiper)}
      >

        {items.map(({ card }, index) => (
          <SwiperSlide key={index}>{card}</SwiperSlide>
        ))}
      </Swiper>

      {paginationImages && (
        <div className="flex items-center gap-4">
          {items.map((item, i) => {
            const showFallback = imageErrors[i];

            return (
              <div
                onClick={() => {
                  swiper?.slideTo(i);
                  swiper?.autoplay.stop();
                }}
                key={i}
                className={`${swiper?.realIndex === i &&
                  "shadow-md -translate-y-3 border-yellow-300 border opacity-90"
                  } cursor-pointer hover:-translate-y-2 z-10 hover:shadow-md hover:opacity-90 duration-200 rounded-xl overflow-hidden max-w-lg w-full h-40 relative`}
              >
                {swiper?.realIndex === i && swiper.autoplay.running && (
                  <div
                    style={{ width: `${progress}%` }}
                    className="duration-100 opacity-50 absolute w-0 h-full inset-0 bg-gray-600 z-10"
                  ></div>
                )}

                <Image
                  alt={`Slide thumbnail ${i}`}
                  src={showFallback ? fallbackImage : item.src} 
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  unoptimized
                  priority
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [i]: true }))
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SwiperCards;
