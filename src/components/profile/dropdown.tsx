import { CircleUserIcon } from "lucide-react"
import { useState } from "react"


export default function dropdown() {

    const [open, isOpen] = useState(false);


    return (
        <div>
           <CircleUserIcon 
           className='cursor-pointer'
           onMouseEnter={() => isOpen(true)}
           onMouseLeave={() => isOpen(false)}
           />

           {open && (
            <div className="absolute inset-0">

            </div>
           )}
        </div>
    )
}