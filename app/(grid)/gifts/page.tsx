"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Item {
  img: string;
  title: string;
  topic: string;
  shortDesc: string;
  longDesc: string;
  specs: { label: string; value: string }[];
}

const items: Item[] = [
  {
    img: "/img1.png",
    title: "First Card",
    topic: "Discount Card 10%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
  {
    img: "/img2.png",
    title: "Second Card",
    topic: "Discount Card 30%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
  {
    img: "/img3.png",
    title: "Third Card",
    topic: "Discount Card 50%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
  {
    img: "/img4.png",
    title: "fourth Card",
    topic: "Discount Card 70%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
  {
    img: "/img5.png",
    title: "Fifth Card",
    topic: "Discount Card 85%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
  {
    img: "/img6.png",
    title: "sixth Card",
    topic: "Discount Card 100%",
    shortDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.",
    specs: [
      { label: "Used Time", value: "6 hours" },
      { label: "Charging port", value: "Type-C" },
      { label: "Compatible", value: "Android" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Controlled", value: "Touch" },
    ],
  },
];

const introParent = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.2 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const introChild = {
  initial: { opacity: 0, y: -12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35 } },
};

const detailParent = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.12, delayChildren: 0.15 },
  },
  exit: { opacity: 0, x: 40, transition: { duration: 0.25 } },
};

const detailChild = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const nextSlide = () => setCurrentIndex((p) => (p + 1) % items.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + items.length) % items.length);

  const currentItem = items[currentIndex];


  let translateY = () => {
    if (showDetail) return "translateY(-50%)";

  }


  return (
    <div className="description relative mx-auto  w-[90%] h-screen md:h-[800px] overflow-hidden mt-8 rounded-xl">
      {/* Glow background */}
      <motion.div
        className="absolute -z-10 top-1/2 left-1/2 w-[500px] h-[300px] rounded-[20%_30%_80%_10%] blur-[120px]"
        initial={{ x: "-10%", y: "-50%", rotate: 0, filter: "blur(150px)" }}
        animate={
          showDetail
            ? { x: "-100%", y: "-50%", rotate: 90, filter: "blur(130px)" }
            : { x: "-10%", y: "-50%", rotate: 0, filter: "blur(150px)" }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Stage */}
      <div className="relative h-[80%] !mb-5">
        {/* Product image */}
        <AnimatePresence mode="wait">
          {showDetail ? (
            <div className="relative w-[90%] ">
              <motion.img
                key={currentItem.img + String(showDetail)}
                src={currentItem.img}
                alt={currentItem.topic}
                className="absolute left-0 mt-72 !w-[30%] md:w-[400px] overflow-hidden animate-pulse "
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: showDetail ? -40 : 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}

              />

            </div>


          ) : (

            <motion.img
              key={currentItem.img + String(showDetail)}
              src={currentItem.img}
              alt={currentItem.topic}
              className="absolute  mt-60 !w-[35%] md:w-[400px]  "
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: showDetail ? -40 : 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}

            />

          )}

        </AnimatePresence>

        {/* Intro (overview) */}
        <AnimatePresence>
          {!showDetail && (
            <motion.div
              key="intro"
              variants={introParent}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-1/2 -translate-y-1/2 w-[300px] md:w-[400px] left-0 "
            >
              <motion.h2 variants={introChild} className="text-3xl font-medium leading-none">
                {currentItem.title}
              </motion.h2>
              <motion.h3 variants={introChild} className="text-larg md:text-5xl font-semibold mt-2">
                {currentItem.topic}
              </motion.h3>
              <motion.p variants={introChild} className="text-gray-300 text-sm mt-3">
                {currentItem.shortDesc}
              </motion.p>
              <motion.button
                variants={introChild}
                onClick={() => setShowDetail(true)}
                className="mt-5 left-0 px-2 py-1 border-b  border-gray-600 font-bold tracking-[0.3em] text-xs md:text-sm hover:bg-purple-400 hover:rounded-xl rounded-xl transition"
              >
                → SEE MORE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail view */}
        <AnimatePresence>
          {showDetail && (
            <motion.div
              key="detail"
              variants={detailParent}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 text-right"
            >
              <motion.h2 variants={detailChild} className="text-3xl md:text-5xl font-bold">
                {currentItem.topic}
              </motion.h2>
              <motion.p variants={detailChild} className="text-white/80 mt-4">
                {currentItem.longDesc}
              </motion.p>
              <motion.div
                variants={detailChild}
                className="flex gap-3 md:gap-4 mt-4 border-t border-gray-300 pt-4 overflow-x-auto"
              >
                {currentItem.specs.map((spec, idx) => (
                  <motion.div
                    key={spec.label + idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.25 + idx * 0.07 }}
                    className="min-w-[90px] text-center flex-shrink-0"
                  >
                    <p className="font-semibold text-sm">{spec.label}</p>
                    <p>{spec.value}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={detailChild} className="mt-6 flex justify-end gap-2">
                <button className="border bg-indigo-500 hover:bg-indigo-400 rounded-2xl px-4 py-2">ADD TO CART</button>
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-2xl">Collecting</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {!showDetail && (
          <>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-xl"
              aria-label="Next"
            >
              ‹
            </button>
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-xl"
              aria-label="Previous"
            >
              ›
            </button>

          </>
        )}
        {showDetail && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDetail(false)}
            className="border-b border-gray-600 font-bold tracking-[0.3em] text-xs md:text-sm px-2 py-1"
          >
            SEE ALL →
          </motion.button>
        )}
      </div>
    </div>
  );
}
