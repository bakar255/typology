import { useState } from "react";
import { useRouter } from 'next/router';
import { ButtonHeader } from "../ui/headerButton"
import Link from "next/link";

const navigationItems = [
  {
    title: 'Bodycare',
    viewAllSlug: 'all-bodycare',
    sectionItems: [
      {
        subItems: 'Savons & Nettoyants',
        subSlug: 'soaps-cleansers',
        items: [
          { name: 'Savon en barre', slug: 'bar-soap' },
          { name: 'Gel douche', slug: 'body-wash' },
          { name: 'Gommages', slug: 'body-scrub' },
        ]
      },
      {
        subItems: 'Soins hydratants',
        subSlug: 'body-moisturizers',
        items: [
          { name: 'Lotions', slug: 'body-lotion' },
          { name: 'Huiles pour le corps', slug: 'body-oils' },
          { name: 'Beurres corporels', slug: 'body-butter' },
        ]
      }
    ]
  },

  {
    title: 'Skincare',
    viewAllSlug: 'all-skincare',
    sectionItems: [
      {
        subItems: 'Nettoyants',
        subSlug: 'cleansers',
        items: [
          { name: 'Gel nettoyant', slug: 'gel-cleanser' },
          { name: 'Mousse nettoyante', slug: 'foam-cleanser' },
          { name: 'Eau micellaire', slug: 'micellar-water' },
        ]
      },
      {
        subItems: 'Sérums',
        subSlug: 'serums',
        items: [
          { name: 'Vitamine C', slug: 'vitamin-c-serum' },
          { name: 'Acide hyaluronique', slug: 'hyaluronic-acid' },
          { name: 'Rétinol', slug: 'retinol-serum' },
        ]
      }
    ]
  },

  {
    title: 'Maquillage',
    viewAllSlug: 'all-maquillage',
    sectionItems: [
      {
        subItems: 'Fond de teint',
        subSlug: 'foundation',
        items: [
          { name: 'Fond de teint liquide', slug: 'liquid-foundation' },
          { name: 'Fond de teint crème', slug: 'cream-foundation' },
          { name: 'Hydratant teinté', slug: 'tinted-moisturizer' },
        ]
      },
      {
        subItems: 'Lèvres',
        subSlug: 'lips',
        items: [
          { name: 'Rouge à lèvres mat', slug: 'matte-lipstick' },
          { name: 'Rouge à lèvres brillant', slug: 'glossy-lipstick' },
          { name: 'Baume teinté', slug: 'tinted-balm' },
        ]
      },
      {
        subItems: 'Yeux',
        subSlug: 'eyes',
        items: [
          { name: 'Palettes', slug: 'eyeshadow-palette' },
          { name: 'Fard à paupières crème', slug: 'cream-eyeshadow' },
          { name: 'Mascara', slug: 'mascara' },
        ]
      }
    ]
  },

  {
    title: 'Parfums',
    viewAllSlug: 'all-parfums',
    sectionItems: [
      {
        subItems: 'Parfum Femme',
        subSlug: 'femme',
        items: [
          { name: 'Parfum rose', slug: 'rose-perfume' },
          { name: 'Parfum jasmin', slug: 'jasmine-perfume' },
          { name: 'Parfum floral', slug: 'floral-perfume' },
        ]
      },
      {
        subItems: 'Parfum Homme',
        subSlug: 'homme',
        items: [
          { name: 'Santal', slug: 'sandalwood' },
          { name: 'Épices ambrées', slug: 'amber-spice' },
          { name: 'Parfum boisé', slug: 'woody-perfume' },
        ]
      }
    ]
  },

  {
    title: 'Lots',
    viewAllSlug: 'all-lots',
    sectionItems: [
      {
        subItems: 'Soins de la peau',
        subSlug: 'skincare-sets',
        items: [
          { name: 'Kit anti-âge', slug: 'anti-aging-kit' },
          { name: 'Lot éclat', slug: 'brightening-bundle' },
          { name: 'Pack hydratation', slug: 'hydration-pack' },
        ]
      },
      {
        subItems: 'Coffrets maquillage',
        subSlug: 'makeup-sets',
        items: [
          { name: 'Coffret maquillage', slug: 'makeup-gift-set' },
          { name: 'Kit yeux', slug: 'eye-kit' },
          { name: 'Kit lèvres', slug: 'lip-kit' },
        ]
      }
    ]
  }
];


export default function NavigationSection() {

  const [onHover, setOnHover] = useState<string | null>(null);

  const router = useRouter();

  return (

    <div className=" ">
      <div className="max-w-[1700px] mx-auto px-4 py-1 relative">
        <nav className="hidden md:flex items-center justify-center">

          <div className="flex gap-8">

            {navigationItems.map((item) => (
              <div
                key={item.title}
                onMouseEnter={() => setOnHover(item.title)}
              >
                <ButtonHeader
                  title={item.title}
                  onClick={() => router.push(`/collection/${item.viewAllSlug}`)}
                />

                {onHover === item.title && (
                  <div
                    className="absolute top-full bg-white z-50 border-t border-gray-300 min-h-[150px] shadow-sm"
                    style={{ left: 'calc(-50vw + 50%)', width: '100vw' }}
                    onMouseLeave={() => setOnHover(null)}
                  >
                    <div className="max-w-[1700px] mx-auto px-8 py-8 flex items-start gap-12">

                      <div className="flex gap-x-32 justify-center flex-1">

                        {/* Navigation Subtitle */}
                        {item.sectionItems?.map((section) => (
                          <div key={section.subItems} className="flex flex-col">

                            <p className="text-lg font-semibold mb-1 uppercase tracking-wide text-[#444444]">
                              {section.subItems}
                            </p>
                            <div className="border-t border-gray-300 w-12 mb-3"></div>

                            {/* Navigation subItems */}
                            {section.items.map((subItem) => (
                              <div key={subItem.name} className="mb-2 space-y-3.5">
                                <Link
                                  className="cursor-pointer text-sm tracking-widest text-[#2c2c2c] hover:text-gray-600 block"
                                  href={`/collection/${subItem.slug}`}
                                >
                                  {subItem.name}
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
      </div >
    </div >

  )
}
