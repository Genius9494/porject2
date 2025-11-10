"use client";

import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

const rewards = [
    "🎮 Free Game",
    "💰 10% Discount",
    "🎁 Bonus Points",
    "😢 Try Again",
    "👑 VIP Access",
    "🕹️ Extra Spin",
];

export default function SpinWheel() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiRef = useRef<HTMLCanvasElement>(null);
    const confettiFrame = useRef<number | null>(null);
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    const size = 400;
    const radius = size / 2;
    const segmentAngle = (2 * Math.PI) / rewards.length;

    // 🎨 رسم العجلة
    const drawWheel = (angleOffset = 0) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, size, size);
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angleOffset);

        for (let i = 0; i < rewards.length; i++) {
            const start = i * segmentAngle;
            const end = start + segmentAngle;

            const gradient = ctx.createLinearGradient(0, 0, radius, radius);
            gradient.addColorStop(0, i % 2 === 0 ? "#8b5cf6" : "#6d28d9");
            gradient.addColorStop(1, i % 2 === 0 ? "#7c3aed" : "#9333ea");

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, start, end);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.save();
            ctx.rotate(start + segmentAngle / 2);
            ctx.translate(radius - 45, 10);
            ctx.rotate(Math.PI / 2);
            ctx.font = "bold 16px Poppins";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(rewards[i], 0, 0);
            ctx.restore();
        }

        ctx.restore();
    };

    // 🌀 دوران تدريجي ببطء في النهاية مع تقييد الوقت الصحيح
    const spinWheel = () => {
        if (spinning) return;

        const lastSpin = localStorage.getItem("lastSpin");
        const now = Date.now(); // ✅ وقت النظام الحقيقي

        // ⛔️ فحص إذا كانت أقل من 24 ساعة
        if (lastSpin && now - parseInt(lastSpin) < 24 * 60 * 60 * 1000) {
            const remaining =
                24 - Math.floor((now - parseInt(lastSpin)) / (60 * 60 * 1000));
            toast(`⏰You can wrap it after ${remaining} hours!`);
            return;
        }

        setSpinning(true);
        setWinner(null);
        setShowOverlay(false);

        const finalRotation = Math.random() * 360;
        const totalRotation = 360 * 8 + finalRotation;
        const duration = 4000;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const animate = (timestamp: number) => {
            const elapsed = timestamp - start;
            if (elapsed < duration) {
                const progress = easeOut(elapsed / duration);
                const currentAngle = totalRotation * progress;
                setRotation(currentAngle * (Math.PI / 180));
                requestAnimationFrame(animate);
            } else {
                const endAngle = totalRotation % 360;
                const adjustedAngle = (endAngle + 90) % 360;
                const winningIndex = Math.floor(
                    (rewards.length -
                        (adjustedAngle / 360) * rewards.length) %
                    rewards.length
                );

                setRotation(endAngle * (Math.PI / 180));
                playWinSound();
                const wonPrize = rewards[winningIndex];
                setWinner(wonPrize);
                setShowOverlay(true);
                startConfetti();
                setSpinning(false);

                // ✅ حفظ وقت اللفة بالوقت الفعلي وليس performance.now()
                localStorage.setItem("lastSpin", Date.now().toString());

                // ✅ حفظ الجائزة
                const saved = JSON.parse(localStorage.getItem("myRewards") || "[]");
                saved.push({ prize: wonPrize, date: new Date().toISOString() });
                localStorage.setItem("myRewards", JSON.stringify(saved));
            }
        };

        requestAnimationFrame(animate);
    };

    // 🔊 صوت الفوز
    const playWinSound = () => {
        const audio = new Audio("/sounds/happy.mp3");
        audio.volume = 0.7;
        audio.play();
    };

    useEffect(() => {
        drawWheel(rotation);
    }, [rotation]);

    // 🎆 إعداد المفرقعات
    const startConfetti = () => {
        const canvas = confettiRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let active = true;
        const confettis: any[] = [];
        const width = canvas.width;
        const height = canvas.height;
        const colors = ["#FFD700", "#FFAA00", "#FFDD55", "#FFFFFF"];

        for (let i = 0; i < 120; i++) {
            confettis.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 3,
                speedY: Math.random() * 4 + 2,
            });
        }

        const draw = () => {
            if (!active) return;
            ctx.clearRect(0, 0, width, height);
            confettis.forEach((c) => {
                ctx.fillStyle = c.color;
                ctx.fillRect(c.x, c.y, c.size, c.size);
                c.x += c.speedX;
                c.y += c.speedY;
                if (c.y > height) c.y = -10;
            });
            confettiFrame.current = requestAnimationFrame(draw);
        };

        draw();

        setTimeout(() => {
            active = false;
            stopConfetti();
        }, 5000);
    };

    const stopConfetti = () => {
        const canvas = confettiRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (confettiFrame.current) {
            cancelAnimationFrame(confettiFrame.current);
            confettiFrame.current = null;
        }
    };

    return (
        <div className="Split relative flex flex-col items-center justify-center h-screen text-white">
            {/* 🔻 المؤشر */}
            <div className="absolute top-[calc(50%-200px)] z-20">
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[35px] border-b-red-500 -rotate-180 -translate-y-16"></div>
            </div>

            {/* 🎡 العجلة */}
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="rounded-full shadow-2xl"
            />

            {/* 🎆 المفرقعات */}
            <canvas
                ref={confettiRef}
                width={typeof window !== "undefined" ? window.innerWidth : 800}
                height={typeof window !== "undefined" ? window.innerHeight : 600}
                className="fixed inset-0 pointer-events-none z-40"
            />

                <div className="flex gap-5 mt-5">
            {/* 🟢 زر السبين */}
            <button
                onClick={spinWheel}
                disabled={spinning}
                className=" bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg transition disabled:opacity-50"
            >
                {spinning ? "Spinning..." : "🎡 SPIN NOW"}
            </button>

            <button
                onClick={() => {
                    stopConfetti();
                    setShowOverlay(false);
                    window.location.href = "/rewards";
                }}
                className=" bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-white font-bold"
            >
                View My Rewards 🏆
            </button>
            </div>
            {/* 🏆 شاشة الفوز */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <h2
                        className="text-5xl font-bold animate-pulse"
                        style={{
                            color: "#FFD700",
                            textShadow:
                                "0 0 25px #FFD700, 0 0 40px #FFDD55, 0 0 70px #FFB700, 0 0 120px #FFAA00",
                        }}
                    >
                        {winner}
                    </h2>

                    <button
                        onClick={() => {
                            stopConfetti();
                            setShowOverlay(false);
                        }}
                        className="mt-10 bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
