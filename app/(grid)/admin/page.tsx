"use client";

import { makeAdmin } from "@/app/actions/makeAdmin";

export default function AdminPage() {
    const promote = async () => {
        const result = await makeAdmin("raed@gmail.com");
        console.log("تم التحديث:", result);
    };

    return <button onClick={promote}>اجعل Raed مسؤول (Admin)</button>;
}
