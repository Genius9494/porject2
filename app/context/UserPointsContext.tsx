"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UserPointsContextType {
    points: number;
    level: string;
    addPoints: (amount: number) => void;
    refreshPoints: () => Promise<void>;
}

const UserPointsContext = createContext<UserPointsContextType | undefined>(undefined);

export function UserPointsProvider({ children }: { children: React.ReactNode }) {
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState("LV-1");

    // جلب النقاط من قاعدة البيانات عند التحميل
    const refreshPoints = async () => {
        const res = await fetch("/api/user/add-points"); // endpoint يعيد بيانات المستخدم مع النقاط والمستوى
        if (res.ok) {
            const data = await res.json();
            setPoints(data.points || 0);
            setLevel(data.level || "LV-1");
        }
    };

    useEffect(() => {
        refreshPoints();
    }, []);

    const addPoints = async (amount: number) => {
        setPoints(prev => prev + amount); // تحديث  في الكلاينت

        // تحديث النقاط في DB
        await fetch("/api/user/add-points", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        // للتأكد من التزامن
        refreshPoints();
    };

    return (
        <UserPointsContext.Provider value={{ points, level, addPoints, refreshPoints }}>
            {children}
        </UserPointsContext.Provider>
    );
}

export function useUserPoints() {
    const context = useContext(UserPointsContext);
    if (!context) throw new Error("useUserPoints must be used within UserPointsProvider");
    return context;
}
