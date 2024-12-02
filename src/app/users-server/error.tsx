"use client";

import { useEffect } from "react";

export default function Error({error}: {error:Error}){
    useEffect(()=>{
        console.log(error);
    }, [error]);
    return (
        <div className="flex item-center justify-center h-screen">
            <div className="text-2x1 text-red-500">Error fetching user data.</div>
        </div>
    );
}