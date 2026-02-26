import { useEffect, useState } from 'react';
import { User, Search, ChevronDown, CircleUserIcon, Heart } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';
import NavigationSection from './navigationSection';
import Logo from '../ui/logo';
import { useRouter } from "next/router"
import { useAuth } from '@/context/AuthContext';


interface User {
  name: string;
  id: number;
  email: string
}

export default function Header() {


      const {user, isAuthenticated, login, logout } = useAuth(); 

      const router = useRouter();

      const fetchProfile = async () => {
        try {
           // Fetch token from localstorage
            const token = localStorage.getItem("token");

            if(!token) {
              console.log("Token missing")
              return
            }
            const URL = "http://localhost:3001/user"

            const response = await fetch(URL, {
              headers: {
                 'Authorization' : `Bearer  ${token}`
              }
            })

            const data = await response.json()

            if(response.ok) {
              const user = data.user; 
              login(user, token)
            } else {
               console.log("Error can't fetch profile's data");
               localStorage.removeItem('token');
            }

        } catch (err) {
            console.error;
            console.log("Error : Can't fetch user's profile data")
        }
    }

    useEffect(() => {
      fetchProfile();
    }, []);


  return (
    <div className="w-full">
        <div className="py-4 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-[1700px] mx-auto relative">

              <SearchInput />
             
              <Logo />

              <div className="absolute top-4 right-5 flex items-center gap-2 md:gap-5">
               {/* Selection langues*/}
              <label htmlFor="languages" className="block mb-1 font-medium text-muted-foreground">
                Français <ChevronDown size={16} className="inline-block ml-1"/>
              </label>

              <div
              onClick={() => router.push("/login")}  
              className='flex gap-2 cursor-pointer hover:bg-gray-100 py-2 px-4'
              > 

              <CircleUserIcon className='cursor-pointer' />

              {connected && User ? (
                <div className='flex'>
                  ${User.name}
                 </div>
              ) : (
                <div>
                   <span className='font-medium text-1xl'>Se connecter</span>
                </div>
              )}
              </div>

                {/* Cart */}
                    <Cart />

              </div>
            </div>
        </div>

        {/* Navigation Section */}
        <NavigationSection />
        
    </div>
  );
} 