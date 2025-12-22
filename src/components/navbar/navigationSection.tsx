import { useState } from "react";
import { useRouter } from 'next/router';
import { ButtonHeader } from "../ui/headerButton"
import Link from "next/link";
         
  const navigationItems = [
  {
    title: 'Bodycare',
    slug: 'bodycare',
    sectionItems: [
      {
        subItems: 'Soaps & Cleansers',
        subSlug: 'soaps-cleansers',
        items: [
          { name: 'Soap', slug: 'soap' },
          { name: 'Lotions', slug: 'lotions' },
          { name: 'Body Oils', slug: 'body-oils' },
          { name: 'Scrubs', slug: 'scrubs' }
        ]
      },
      {
        subItems: 'Korean Beauty',
        subSlug: 'korean-beauty',
        items: [
          // subItems: ['Sheet Masks', 'Essences', 'Toners', 'Ampoules']
          {name: 'Sheet Masks', slug: 'sheet-masks'},
          {name: 'Essences', slug: 'essences'},
          {name: 'Toners', slug: 'toners'},
          {name: 'Ampoules', slug: 'ampoules'},
        ]
      }
    ]
  },

  {
    title: 'Skin Care',
    slug: 'skin-care',
    sectionItems: [
      {
        subItems: 'Cleansers',
        subSlug: 'cleansers',
        items: [
          { name: 'Foam Cleanser', slug: 'foam-cleanser' },
          { name: 'Gel Cleanser', slug: 'gel-cleanser' },
          { name: 'Micellar Water', slug: 'micellar-water' }
        ]
      },
      {
        subItems: 'Moisturizers',
        subSlug: 'moisturizers',
        items: [
          { name: 'Day Cream', slug: 'day-cream' },
          { name: 'Night Cream', slug: 'night-cream' },
          { name: 'Hydrating Lotion', slug: 'hydrating-lotion' }
        ]
      },
      {
        subItems: 'Serums',
        subSlug: 'serums',
        items: [
          { name: 'Vitamin C Serum', slug: 'vitamin-c-serum' },
          { name: 'Hyaluronic Acid', slug: 'hyaluronic-acid' },
          { name: 'Retinol Serum', slug: 'retinol-serum' }
        ]
      },
      {
        subItems: 'Masks',
        subSlug: 'masks',
        items: [
          { name: 'Clay Mask', slug: 'clay-mask' },
          { name: 'Sheet Mask', slug: 'sheet-mask' },
          { name: 'Sleeping Mask', slug: 'sleeping-mask' }
        ]
      }
    ]
  },

  {
    title: 'Bundles',
    slug: 'bundles',
    sectionItems: [
      {
        subItems: 'Skincare Sets',
        subSlug: 'skincare-sets',
        items: [
          { name: 'Anti-Aging Kit', slug: 'anti-aging-kit' },
          { name: 'Acne Treatment Set', slug: 'acne-treatment-set' },
          { name: 'Brightening Bundle', slug: 'brightening-bundle' }
        ]
      },
      {
        subItems: 'Bodycare Sets',
        subSlug: 'bodycare-sets',
        items: [
          { name: 'Relaxation Spa Set', slug: 'relaxation-spa-set' },
          { name: 'Exfoliation Kit', slug: 'exfoliation-kit' },
          { name: 'Hydration Pack', slug: 'hydration-pack' }
        ]
      },
      {
        subItems: 'Gift Sets',
        subSlug: 'gift-sets',
        items: [
          { name: 'Luxury Gift Box', slug: 'luxury-gift-box' },
          { name: 'Travel Size Set', slug: 'travel-size-set' },
          { name: 'Holiday Special', slug: 'holiday-special' }
        ]
      },
      {
        subItems: 'Seasonal',
        subSlug: 'seasonal',
        items: [
          { name: 'Summer Glow Set', slug: 'summer-glow-set' },
          { name: 'Winter Care Bundle', slug: 'winter-care-bundle' },
          { name: 'Spring Renewal Kit', slug: 'spring-renewal-kit' }
        ]
      }
    ]
  },

  {
    title: 'Makeup',
    slug: 'makeup',
    sectionItems: [
      {
        subItems: 'Foundation',
        subSlug: 'foundation',
        items: [
          { name: 'Liquid Foundation', slug: 'liquid-foundation' },
          { name: 'Cream Foundation', slug: 'cream-foundation' },
          { name: 'Tinted Moisturizer', slug: 'tinted-moisturizer' }
        ]
      },
      {
        subItems: 'Lipstick',
        subSlug: 'lipstick',
        items: [
          { name: 'Matte Lipstick', slug: 'matte-lipstick' },
          { name: 'Glossy Lipstick', slug: 'glossy-lipstick' },
          { name: 'Tinted Balm', slug: 'tinted-balm' }
        ]
      },
      {
        subItems: 'Eyeshadow',
        subSlug: 'eyeshadow',
        items: [
          { name: 'Palette', slug: 'palette' },
          { name: 'Single Shade', slug: 'single-shade' },
          { name: 'Cream Eyeshadow', slug: 'cream-eyeshadow' }
        ]
      },
      {
        subItems: 'Brushes',
        subSlug: 'brushes',
        items: [
          { name: 'Foundation Brush', slug: 'foundation-brush' },
          { name: 'Eyeshadow Brush Set', slug: 'eyeshadow-brush-set' },
          { name: 'Lip Brush', slug: 'lip-brush' }
        ]
      }
    ]
  },

  {
    title: 'Parfums',
    slug: 'parfums',
    sectionItems: [
      {
        subItems: 'Floral',
        subSlug: 'floral',
        items: [
          { name: 'Rose Perfume', slug: 'rose-perfume' },
          { name: 'Jasmine Scent', slug: 'jasmine-scent' },
          { name: 'Lavender Mist', slug: 'lavender-mist' }
        ]
      },
      {
        subItems: 'Oriental',
        subSlug: 'oriental',
        items: [
          { name: 'Vanilla Essence', slug: 'vanilla-essence' },
          { name: 'Sandalwood', slug: 'sandalwood' },
          { name: 'Amber Spice', slug: 'amber-spice' }
        ]
      },
      {
        subItems: 'Fresh',
        subSlug: 'fresh',
        items: [
          { name: 'Citrus Blast', slug: 'citrus-blast' },
          { name: 'Ocean Breeze', slug: 'ocean-breeze' },
          { name: 'Green Tea', slug: 'green-tea' }
        ]
      },
      {
        subItems: 'Woody',
        subSlug: 'woody',
        items: [
          { name: 'Cedarwood', slug: 'cedarwood' },
          { name: 'Pine Forest', slug: 'pine-forest' },
          { name: 'Oak Moss', slug: 'oak-moss' }
        ]
      }
    ]
  }
];


export default function NavigationSection() {

const [onHover, setOnHover] = useState<string | null >(null);

const router = useRouter();

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
            onClick={() => router.push(`/${item.slug}`) }
            />

            {onHover === item.title && (
              <div className="absolute top-full bg-white z-50 border-t border-gray-300 min-h-[150px]" style={{left: 'calc(-50vw + 50%)', width: '100vw'}}   onMouseLeave={() => setOnHover(null)}>
                <div className=" px-8 py-6">

                    <div className="flex gap-x-32 justify-center">
                     
                    {/* Navigation Subtitle */}
                    {item.sectionItems?.map((section) => (
                      <div key={section.subItems} className="flex flex-col">

                        <h2 className="text-lg font-semibold mb-1 text-[#444444] uppercase tracking-wide">{section.subItems}</h2>
                        <div className="border-t border-gray-300 mb-3"></div>

                    {/* Navigation subItems */}
                        {section.items.map((section) => (
                          <div key={section.name} className="mb-2 space-y-3.5">
                            <Link 
                            className="cursor-pointer text-sm tracking-widest text-[#2c2c2c] hover:text-gray-600"
                            href={`${section.slug}`}
                            >
                            {section.name}
                           </Link>
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