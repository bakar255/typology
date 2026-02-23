import React from "react";

type WelcomeMessageProps = {
    username: string;
}

export default function WelcomeMessage({username}: WelcomeMessageProps) {
    return (
        <div className="flex justify-center inset-0 items-center gap-2 bg-blue-100 rounded-2xl">
         <div className="animate-spin h-6 w-6 border-2">
          <span className="font-semibold"> Bienvenue, {username} </span>
         </div>
        </div>
    )
}