import React from "react";
import { CheckCircle2 } from "lucide-react";

type WelcomeMessageProps = {
    username: string;
}

export default function WelcomeMessage({ username }: WelcomeMessageProps) {
    return (
        <div className="my-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Bienvenue, {username}! 👋
                    </h3>
                    <p className="text-sm text-gray-700">
                        Heureux de vous voir de retour. Explorez notre nouvelle collection et profitez d'offres exclusives!
                    </p>
                </div>
                <button className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Découvrir
                </button>
            </div>
        </div>
    );
}