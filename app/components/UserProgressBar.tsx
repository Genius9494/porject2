// /components/UserProgressBar.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useCollected } from '../context/CollectedContext';
import { useGetUser } from '@/lib/queryFunctions'; // إذا تستخدمه في مشروعك

export default function UserProgressBar({ max = 2000 }: { max?: number }) {
    const { userPoints } = useCollected();
    const { user } = useGetUser(); // اسم المستخدم و level إذا موجود
    const [animatedPoints, setAnimatedPoints] = useState(userPoints);

    useEffect(() => {
        let start = animatedPoints;
        const end = userPoints;
        if (start === end) return;
        const increment = Math.ceil(Math.abs(end - start) / 20) || 1;
        const dir = end > start ? 1 : -1;
        const interval = setInterval(() => {
            start = start + increment * dir;
            if ((dir === 1 && start >= end) || (dir === -1 && start <= end)) {
                start = end;
                clearInterval(interval);
            }
            setAnimatedPoints(start);
        }, 25);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPoints]);

    const pct = Math.min((animatedPoints / max) * 100, 100);

    return (
        <div className="w-full p-2">
            <div className="flex justify-between items-end mb-2">
                <div className="text-sm text-green-300 font-semibold">
                    {user?.data?.name || 'Guest'} <span className="text-xs text-gray-400">({user?.data?.level || 'LV-1'})</span>
                </div>
                <div className="text-xs text-gray-400">Points: {animatedPoints} / {max}</div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}
