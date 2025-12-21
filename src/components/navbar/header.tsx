import { useState } from 'react';
import { User, Search, ChevronDown, CircleUserIcon, Heart } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';
import NavigationSection from './navigationSection';

export default function Header() {


  return (
    <div className="w-full">
        <div className="py-1 px-4">
            <div className="flex items-center justify-between max-w-[1700px] mx-auto">

              <SearchInput />
             
              <div className="flex flex-col items-center gap-1 flex-1">
                <span className="font-bold text-2xl text-foreground logo">Typeaulogy</span>
                <span className="text-foreground font-semibold text-2xl logo">Paris</span>
              </div>

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