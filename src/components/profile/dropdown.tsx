import { CircleUserIcon, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"


export default function dropdown() {

    const [open, setOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        setOpen(false);
        router.push("/");
    };


    return (
        <div className="relative">
           <CircleUserIcon 
           className='cursor-pointer'
           onMouseEnter={() => setOpen(true)}
           onMouseLeave={() => setOpen(false)}
           />

           {open && isAuthenticated && user && (
            <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            >
                <div className="px-4 py-2 border-b">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={handleLogout}
                >
                    <LogOut size={16} />
                    Se déconnecter
                </button>
            </div>
           )}
        </div>
    )
}