import { useState } from "react";
import { ButtonHeader } from "../ui/headerButton"

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

export default function NavigationSection() {

const [onHover, setOnHover] = useState<string | null >(null);
    
    return (
 <div className="relative border-t border-b border-gray-200">
  <div className="max-w-[1700px] mx-auto px-4 py-1">
    <nav className="flex items-center justify-center">

      <div className="flex gap-8">

        {navigationItems.map((item) => (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => setOnHover(item.title)}
            onMouseLeave={() => setOnHover(null)}
          >
            <ButtonHeader title={item.title} />

            {onHover === item.title && (
              <div className="absolute top-full left-0 right-0 w-screen bg-white z-50 border-t border-gray-300 min-h-[150px]">
                <div className=" px-8 py-6">

                    <div className="flex gap-x-16 ">

                    {item.subItems?.map((sub) => (
                      <span
                        key={sub}
                        className="cursor-pointer text-1xl tracking-widest border-b border-gray-200 "
                      >
                        {sub}
                      </span>
                    ))}
                  </div>


                

                </div>
              </div>
            )}
          </div>
        ))}

      </div>
    </nav>
  </div>
</div>

    )
}