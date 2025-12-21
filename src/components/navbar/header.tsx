import { useState } from 'react';
import { User, Search, ChevronDown } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';

export default function Header() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const navigationItems = [
    {
      title: 'Bodycare',
      subItems: ['Soaps', 'Lotions', 'Body Oils', 'Scrubs']
    },
    {
      title: 'Skin care',
      subItems: ['Cleansers', 'Moisturizers', 'Serums', 'Masks']
    },
    {
      title: 'Bundles',
      subItems: ['Skincare Sets', 'Bodycare Sets', 'Gift Sets', 'Seasonal']
    },
    {
      title: 'Makeup',
      subItems: ['Foundation', 'Lipstick', 'Eyeshadow', 'Brushes']
    },
    {
      title: 'Parfums',
      subItems: ['Floral', 'Oriental', 'Fresh', 'Woody']
    },
    {
      title: 'Face care',
      subItems: ['Cleansing', 'Toning', 'Moisturizing', 'Treatment']
    },
    {
      title: 'Hair care',
      subItems: ['Shampoos', 'Conditioners', 'Treatments', 'Styling']
    },
    {
      title: 'Korean Beauty',
      subItems: ['Sheet Masks', 'Essences', 'Toners', 'Ampoules']
    }
  ];

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
                
                {/* Cart */}
                <Cart />
              </div>
            </div>
        </div>

        {/* Navigation Section */}
        <div className="border-t border-b border-gray-200">
            <div className="max-w-[1700px] mx-auto px-4 py-1">
                <nav className="flex items-center justify-center gap-15">
                    <ButtonHeader title='Bodycare'> </ButtonHeader>
                    <ButtonHeader title='Skin care' className=" px-6 py-2" />
                    <ButtonHeader title='Bundles' className=" px-6 py-2" />
                    <ButtonHeader title='Makeup' className="pl-6 py-2" />
                    <ButtonHeader title='Parfums' className="pl-6 py-2" />
                    <ButtonHeader title='Face care' className="pl-6 py-2" />
                    <ButtonHeader title='Hair care' className=" " />
                    <ButtonHeader title='Korean Beauty' className=" " />
                </nav>
            </div>
        </div>
    </div>
  );
} 