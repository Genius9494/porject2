"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Message {
    sender: "user" | "bot";
    text: string;
    results?: any[];
}

export default function GameAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMsg: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            // ✅ التحقق من صحة الاستجابة أولاً
            if (!res.ok) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "⚠️ Assistant is currently unavailable. Try again later." },
                ]);
                setLoading(false);
                return;
            }

            // ✅ أمان إضافي في حالة الرد الفارغ
            let data;
            try {
                data = await res.json();
            } catch {
                data = { reply: "❌ Failed to parse server response." };
            }

            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: data.reply, results: data.results },
            ]);
        } catch (err) {
            console.error("Error sending message:", err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "💥 Connection error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 🔘 زر المساعد العائم */}
            <button
                className="fixed bottom-6 right-0 -translate-x-1 bg-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                onClick={() => setOpen(!open)}
                title="Ask the Game Assistant"
            >
                <MessageCircle className="text-white" size={15} />
            </button>

            {/* 💬 نافذة المحادثة */}
            {open && (
                <div className="fixed bottom-20 right-6 w-80 bg-gray-900 text-white rounded-2xl p-4 shadow-lg border border-gray-700">
                    <div className="h-64 overflow-y-auto space-y-3 mb-3 scroll-smooth">
                        {messages.length === 0 && (
                            <p className="Split text-gray-400 text-center italic capitalize">
                                Ask about any game, genre, or recommendation , and i'm here to help you with this 🤖
                            </p>
                        )}

                        {messages.map((m, i) => (
                            <div key={i} className="animate-fadeIn">
                                <p className={m.sender === "bot" ? "text-gray-400" : "text-green-400"}>
                                    {m.sender === "bot" ? "🤖" : "👤"} {m.text}
                                </p>

                                {/* 🎮 عرض صور الألعاب */}
                                {m.results && (
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {m.results.map((g: any) => (
                                            <div key={g.id} className="text-sm text-center">
                                                <img
                                                    src={g.background_image}
                                                    alt={g.name}
                                                    className="rounded-lg w-full line-clamp-2 h-20 object-cover border border-gray-700"
                                                />
                                                <p className="truncate">{g.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* ⏳ مؤشر التحميل */}
                        {loading && (
                            <p className="text-purple-400 text-sm italic text-center">Assistant is thinking...</p>
                        )}
                    </div>

                    {/* 📩 حقل الإدخال */}
                    <div className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="Split flex-1 bg-gray-800 rounded-l-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="Ask me something..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-purple-700 px-3 rounded-r-lg hover:bg-purple-600 transition"
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
