"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CollectedCard {
    title: string;
    img: string;
    topic: string;
}

interface CollectedContextType {
    collectedCards: CollectedCard[];
    addCard: (card: CollectedCard) => void;
    isCollected: (title: string) => boolean;
    userPoints: number;
    setUserPoints: React.Dispatch<React.SetStateAction<number>>;
    
}


const CollectedContext = createContext<CollectedContextType | undefined>(undefined);

export function CollectedProvider({ children }: { children: React.ReactNode }) {
    const [collectedCards, setCollectedCards] = useState<CollectedCard[]>([]);
    const [userPoints, setUserPoints] = useState(0); 

    // تحميل البطاقات من Local Storage عند تشغيل التطبيق
    useEffect(() => {
        const saved = localStorage.getItem("collectedCards");
        if (saved) setCollectedCards(JSON.parse(saved));
    }, []);

    // حفظ البطاقات في Local Storage عند أي تغيير
    useEffect(() => {
        localStorage.setItem("collectedCards", JSON.stringify(collectedCards));
    }, [collectedCards]);

    const addCard = (card: CollectedCard) => {
        if (!collectedCards.find((c) => c.title === card.title)) {
            setCollectedCards((prev) => [...prev, card]);
        }
    };

    const isCollected = (title: string) => {
        return collectedCards.some((c) => c.title === title);
    };

    return (
        <CollectedContext.Provider value={{ collectedCards, addCard, isCollected, userPoints, setUserPoints }}>
            {children}
        </CollectedContext.Provider>
    );
}

export function useCollected() {
    const context = useContext(CollectedContext);
    if (!context) throw new Error("useCollected must be used within CollectedProvider");
    return context;
}
