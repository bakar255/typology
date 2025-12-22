import Link from "next/link"

interface LogoProps {
    className?: string,
    href?: string, 
}

export default function Logo( {className = '', href =  '' }: LogoProps) {

    return (
         <Link 
         href={href || `/`}
         aria-label="Go to homepage"
         className ={ `absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 flex-1 cursor-pointer ${className}` }>

            <span className="font-bold text-2xl text-foreground logo">Typeaulogy</span>
            <span className="text-foreground font-semibold text-2xl logo">Paris</span>

         </Link>
                
    )
}