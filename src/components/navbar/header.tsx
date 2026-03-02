import { useEffect, useState } from 'react';
import { User, Search, ChevronDown, CircleUserIcon, Heart } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';
import NavigationSection from './navigationSection';
import Logo from '../ui/logo';
import { useRouter } from "next/router"
import { useAuth } from '@/context/AuthContext';


interface UserType {
  name: string;
  id: number;
  email: string
}

export default function Header() {

      const {user, isAuthenticated, login, logout, isLoading } = useAuth(); 

      const router = useRouter();

      const fetchProfile = async (token: string) => {
        try {
            const URL = "http://localhost:3001/user"

            const response = await fetch(URL, {
              headers: {
                 'Authorization' : `Bearer ${token}`
              }
            })

            const data = await response.json()

            if(response.ok) {
              const userData = data.user; 
              login(userData, token)
            } else {
               console.log("Error can't fetch profile's data");
               logout();
            }

        } catch (err) {
            console.error(err);
            logout();
        }
    }

    useEffect(() => {
      
      if (!isAuthenticated && !isLoading) {
        const token = localStorage.getItem("token");
        if (token) {
          fetchProfile(token);
        }
      }
    }, [isLoading, isAuthenticated]);


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
              onClick={() => !isAuthenticated && router.push("/login")}  
              className='flex gap-2 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded'
              > 

              <CircleUserIcon className='cursor-pointer' />

              {isAuthenticated && user ? (
                <div className='flex items-center'>
                  <span className='font-medium text-sm'>{user.name}</span>
                 </div>
              ) : (
                <div>
                   <span className='font-medium text-sm'>Se connecter</span>
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