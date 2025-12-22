import { useState } from 'react';
import { User, Search, ChevronDown, CircleUserIcon, Heart } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';
import NavigationSection from './navigationSection';
import Logo from '../ui/logo';

export default function Header() {


  return (
    <div className="w-full">
        <div className="py-4 px-4">
            <div className="flex items-center justify-between max-w-[1700px] mx-auto relative">

              <SearchInput />
             
              <Logo />

              <div className="flex items-center gap-7">
               {/* Selection langues*/}
              <label htmlFor="languages" className="block mb-1 text-sm text-muted-foreground">
                Français <ChevronDown size={16} className="inline-block ml-1"/>
              </label>

              <CircleUserIcon className='cursor-pointer' />
              <Heart className='cursor-pointer'/>
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