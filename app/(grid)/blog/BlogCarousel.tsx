"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { BlogPost } from "@/lib/getBlogPosts";
import Image from "next/image";

export default function BlogCarousel({ posts }: { posts: Omit<BlogPost, "content">[] }) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const [mouseOffset, setMouseOffset] = useState(0);
    const isPausedRef = useRef(false);

    // لمس الموبايل
    const touchStartX = useRef(0);
    const touchCurrentX = useRef(0);

    // للماوس سحب
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragAngleStart = useRef(0);

    // دوران تلقائي
    useEffect(() => {
        let animationFrame: number;
        const rotate = () => {
            if (!isPausedRef.current && !isDragging.current) {
                angleRef.current += 0.2; // سرعة الدوران
            }
            if (carouselRef.current) {
                carouselRef.current.style.transform = `rotateY(${angleRef.current + mouseOffset}deg)`;
            }
            animationFrame = requestAnimationFrame(rotate);
        };
        rotate();
        return () => cancelAnimationFrame(animationFrame);
    }, [mouseOffset]);

    // تحريك بالماوس (سحب)
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragAngleStart.current = angleRef.current;
        isPausedRef.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - dragStartX.current;
        angleRef.current = dragAngleStart.current + deltaX * 0.3; // حساسية السحب
        if (carouselRef.current) {
            carouselRef.current.style.transform = `rotateY(${angleRef.current + mouseOffset}deg)`;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        isPausedRef.current = false;
    };

    const handleMouseLeave = () => {
        if (isDragging.current) {
            isDragging.current = false;
            isPausedRef.current = false;
        }
    };

    // لمس الموبايل - بداية السحب
    const handleTouchStart = (e: React.TouchEvent) => {
        isPausedRef.current = true;
        touchStartX.current = e.touches[0].clientX;
    };

    // لمس الموبايل - أثناء السحب
    const handleTouchMove = (e: React.TouchEvent) => {
        touchCurrentX.current = e.touches[0].clientX;
        const deltaX = touchCurrentX.current - touchStartX.current;
        angleRef.current += deltaX * 0.3; // الحساسية
        touchStartX.current = touchCurrentX.current;
        if (carouselRef.current) {
            carouselRef.current.style.transform = `rotateY(${angleRef.current + mouseOffset}deg)`;
        }
    };

    // لمس الموبايل - نهاية السحب
    const handleTouchEnd = () => {
        isPausedRef.current = false;
    };

    const images = [{
        image: "/batman.jpg",
    },
    {
        image: "/amongus.jpg",
    },
    {
        image: "/allimit.jpg",
    },
    {
        image: "/batman.jpg",
    },
    {
        image: "/doom.jpg",
    },
    {
        image: "/crazy.jpg",
    },
    {
        image: "/crown.jpg",
    },
    {
        image: "/deadzone.jpg",
    },
    {
        image: "/elder.jpg",
    },
    {
        image: "/allimit.jpg",
    },
    {
        image: "/elder2.jpg",
    },
    {
        image: "/fallback.jpg",
    },
    {
        image: "/fbc.jpg",
    },
    {
        image: "/feral.jpg",
    },
    {
        image: "/fortnite.jpg",
    },

    ]

    return (
        <div
            className="relative w-[300px] h-[300px] mx-auto mt-44 sticky! perspective"
            style={{ "--radius": "500px", "--total": posts.length } as React.CSSProperties}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div ref={carouselRef} className="carousel h-[100%] relative w-[100%]">
                {posts.map(({ slug, title, publishedAt }, i) => {
                    const imageSrc = images[i % images.length].image; // الصورة المقابلة للمقال
                    return (
                        <div
                            key={slug}
                            className="card hover:bg-red-500 rounded-2xl -mt-8 absolute overflow-hidden top-0 left-0 w-[200px] h-[300px] cursor-pointer"
                            style={{ "--i": i } as React.CSSProperties}
                            onMouseEnter={() => (isPausedRef.current = true)}
                            onMouseLeave={() => (isPausedRef.current = false)}
                        >
                            <Link href={`/blog/${slug}`}>
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="w-full h-[60%] object-cover rounded-xl hover:skew-x-3"
                                />
                                <div className="p-2">
                                    <div className="text-xs font-bold text-gray-400 hover:text-gray-500">
                                        {title}
                                    </div>
                                    <p className="text-green-100 mt-2 text-sm absolute bottom-0">
                                        {new Date(publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
