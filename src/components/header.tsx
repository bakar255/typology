import { User, Search, ChevronDown } from 'lucide-react';

export default function Header() {

  return (
    <div className="fixed top-0 left-0 w-full py-1 p-5 bg-white z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-[1700px] mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-[19px] font-medium">Acceuil</span>
            <button className="text-[19px] font-medium">A propos </button>
            <button className="text-[19px] font-medium ml-2 cursor-pointer bg-[#fdcd95] py-1 p-5 rounded-full">Produits <ChevronDown size={24} className='inline-block text-black'/> </button>
          </div>
          <div className="items-center flex flex-col gap-1">
            <span className="font-bold text-2xl text-black">Typeaulogy</span>
            <span className="text-black font-semibold text-2xl">Paris</span>
          </div>
          <div className="flex items-center gap-7">
           {/* Selection langues*/}
          <label htmlFor="languages" className="block font-semibold mb-1">
            Français <ChevronDown size={26} className="inline-block ml-1 text-black"/>
          </label>
            <label htmlFor=""></label>
            <Search size={26} className=" text-black"/>
            <User size={26} className=" text-black"/>
          </div>
        </div>

    </div>
  );
} 