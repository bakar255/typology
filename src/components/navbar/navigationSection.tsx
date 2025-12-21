import { useState } from "react";
import { ButtonHeader } from "../ui/headerButton"

         
// ['Soaps',   'Lotions',  'Body Oils', 'Scrubs']
        

          
         
          
  const navigationItems = [
    {
      title: 'Bodycare',
      sectionItems: [
        {
        subItems: 'Soaps & Cleansers',
        item: ['Soap', 'Lotions',  'Body Oils', 'Scrubs']
        }
      ]
    },
    {
      title: 'Skin care',
      sectionItems: [
        {
          subItems: 'Cleansers',
          item: ['Foam Cleanser', 'Gel Cleanser', 'Micellar Water']
        },
        {
          subItems: 'Moisturizers',
          item: ['Day Cream', 'Night Cream', 'Hydrating Lotion']
        },
        {
          subItems: 'Serums',
          item: ['Vitamin C Serum', 'Hyaluronic Acid', 'Retinol Serum']
        },
        {
          subItems: 'Masks',
          item: ['Clay Mask', 'Sheet Mask', 'Sleeping Mask']
        }
      ]
    },
    {
      title: 'Bundles',
      sectionItems: [
        {
          subItems: 'Skincare Sets',
          item: ['Anti-Aging Kit', 'Acne Treatment Set', 'Brightening Bundle']
        },
        {
          subItems: 'Bodycare Sets',
          item: ['Relaxation Spa Set', 'Exfoliation Kit', 'Hydration Pack']
        },
        {
          subItems: 'Gift Sets',
          item: ['Luxury Gift Box', 'Travel Size Set', 'Holiday Special']
        },
        {
          subItems: 'Seasonal',
          item: ['Summer Glow Set', 'Winter Care Bundle', 'Spring Renewal Kit']
        }
      ]
    },
    {
      title: 'Makeup',
      sectionItems: [
        {
          subItems: 'Foundation',
          item: ['Liquid Foundation', 'Cream Foundation', 'Tinted Moisturizer']
        },
        {
          subItems: 'Lipstick',
          item: ['Matte Lipstick', 'Glossy Lipstick', 'Tinted Balm']
        },
        {
          subItems: 'Eyeshadow',
          item: ['Palette', 'Single Shade', 'Cream Eyeshadow']
        },
        {
          subItems: 'Brushes',
          item: ['Foundation Brush', 'Eyeshadow Brush Set', 'Lip Brush']
        }
      ]
    },
    {
      title: 'Parfums',
      sectionItems: [
        {
          subItems: 'Floral',
          item: ['Rose Perfume', 'Jasmine Scent', 'Lavender Mist']
        },
        {
          subItems: 'Oriental',
          item: ['Vanilla Essence', 'Sandalwood', 'Amber Spice']
        },
        {
          subItems: 'Fresh',
          item: ['Citrus Blast', 'Ocean Breeze', 'Green Tea']
        },
        {
          subItems: 'Woody',
          item: ['Cedarwood', 'Pine Forest', 'Oak Moss']
        }
      ]
    },
    {
      title: 'Face care',
      sectionItems: [
        {
          subItems: 'Cleansing',
          item: ['Face Wash', 'Cleansing Oil', 'Micellar Cleanser']
        },
        {
          subItems: 'Toning',
          item: ['Hydrating Toner', 'Astringent Toner', 'Calming Toner']
        },
        {
          subItems: 'Moisturizing',
          item: ['Face Cream', 'Face Oil', 'Gel Moisturizer']
        },
        {
          subItems: 'Treatment',
          item: ['Exfoliating Scrub', 'Peel Mask', 'Eye Cream']
        }
      ]
    },
    {
      title: 'Hair care',
      sectionItems: [
        {
          subItems: 'Shampoos',
          item: ['Volumizing Shampoo', 'Moisturizing Shampoo', 'Color Protect Shampoo']
        },
        {
          subItems: 'Conditioners',
          item: ['Deep Conditioner', 'Leave-in Conditioner', 'Hair Mask']
        },
        {
          subItems: 'Treatments',
          item: ['Hair Oil', 'Serum', 'Repair Treatment']
        },
        {
          subItems: 'Styling',
          item: ['Hair Spray', 'Gel', 'Mousse']
        }
      ]
    },
    {
      title: 'Korean Beauty',
      sectionItems: [
        {
          subItems: 'Sheet Masks',
          item: ['Hydrating Mask', 'Brightening Mask', 'Anti-Aging Mask']
        },
        {
          subItems: 'Essences',
          item: ['Toning Essence', 'Hydrating Essence', 'Brightening Essence']
        },
        {
          subItems: 'Toners',
          item: ['Hydrating Toner', 'Pore Minimizing Toner', 'Soothing Toner']
        },
        {
          subItems: 'Ampoules',
          item: ['Vitamin Ampoule', 'Collagen Ampoule', 'Hyaluronic Ampoule']
        }
      ]
    },
    {
     title: 'Luxury',
      sectionItems: [
        {
          subItems: 'Dior',
          item: ['Lip Glow', 'Capture Totale Cream', 'Miss Dior Perfume']
        },
        {
          subItems: 'Guerlain',
          item: ['Abeille Royale Cream', 'Meteorites Powder', 'Shalimar Perfume']
        },
        {
          subItems: 'La Mer',
          item: ['Crème de la Mer', 'The Treatment Lotion', 'Lip Balm']
        },
        {
          subItems: 'Givenchy',
          item: ['Le Rouge Lipstick', 'Prisme Libre Eyeshadow', 'Ambroisie Perfume']
        }
      ]
    }
  ];

export default function NavigationSection() {

const [onHover, setOnHover] = useState<string | null >(null);
    
    return (
 <div className=" ">
  <div className="max-w-[1700px] mx-auto px-4 py-1 relative">
    <nav className="flex items-center justify-center">

      <div className="flex gap-8">

        {navigationItems.map((item) => (
          <div
            key={item.title}
            onMouseEnter={() => setOnHover(item.title)}
           
          >
            <ButtonHeader 
            title={item.title} 
            />

            {onHover === item.title && (
              <div className="absolute top-full bg-white z-50 border-t border-gray-300 min-h-[150px]" style={{left: 'calc(-50vw + 50%)', width: '100vw'}}   onMouseLeave={() => setOnHover(null)}>
                <div className=" px-8 py-6">

                    <div className="flex gap-x-32 justify-center">

                    {item.sectionItems?.map((section) => (
                      <div key={section.subItems} className="flex flex-col">

                        <h2 className="text-lg font-semibold mb-1 text-[#444444] uppercase tracking-wide">{section.subItems}</h2>
                        <div className="border-t border-gray-300 mb-3"></div>

                        {section.item.map((i) => (
                          <div key={i} className="mb-2 space-y-3.5">
                            <span className="cursor-pointer text-sm tracking-widest text-[#2c2c2c] hover:text-gray-600">
                              {i}
                            </span>
                          </div>
                        ))}
                      </div>
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