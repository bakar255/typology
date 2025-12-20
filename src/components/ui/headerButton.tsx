// Handle button's props with chevrow (title, content,  )

import { ChevronDown } from "lucide-react";

interface ButtonProps 

    extends React.ButtonHTMLAttributes<HTMLButtonElement>{
        title: string;
        className?: string;
    }

    export function ButtonHeader({title, className}: ButtonProps) {
        return(
            <button className={`btn ${className} hover:bg-gray-50 transition-all duration-500 relative overflow-hidden group`} >
                {title}
                <ChevronDown size={16} className="inline-block ml-1 transition-transform duration-500 group-hover:rotate-180"/>
                <span className="absolute bottom-0 left-full w-full h-0.5 bg-black transition-all duration-300 group-hover:left-0"></span>
            </button>

        )
    }