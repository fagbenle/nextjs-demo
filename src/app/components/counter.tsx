"use client";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export const Counter = () => {
    const {isLoaded, userId, sessionId, getToken} = useAuth();
    console.log("Counter Component");
    const [count, setCounter] = useState(0);

    if (!isLoaded || !userId) {
        return null;
    }

    return (
        <button onClick={() => setCounter(count + 1)}>Clicked {count} Times</button>
    );
}