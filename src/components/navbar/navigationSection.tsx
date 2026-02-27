import { useState } from "react";
import { useRouter } from 'next/router';
import { ButtonHeader } from "../ui/headerButton"
import Link from "next/link";
import { ProductPreview } from "./productPreview";

const navigationItems = [
  {
    title: 'Bodycare',
    slug: 'bodycare',
    sectionItems: [
      {
        subItems: 'Savons et nettoyants',
        subSlug: 'soaps-cleansers',
        items: [
          { name: 'Savon', slug: 'soap' },
          { name: 'Lotions', slug: 'lotions' },
          { name: 'Huiles pour le corps', slug: 'body-oils' },
          { name: 'Gommages', slug: 'scrubs' }
        ]
      },
      {
        subItems: 'Beauté coréenne',
        subSlug: 'korean-beauty',
        items: [
          // subItems: ['Sheet Masks', 'Essences', 'Toners', 'Ampoules']
          { name: 'Masques en feuilles', slug: 'sheet-masks' },
          { name: 'Essences', slug: 'essences' },
          { name: 'Toniques', slug: 'toners' },
          { name: 'Ampoules', slug: 'ampoules' },
        ]
      }
    ]
  },

  {
    title: 'Skincare',
    slug: 'skin-care',
    sectionItems: [
      {
        subItems: 'Nettoyants',
        subSlug: 'cleansers',
        items: [
          { name: 'Nettoyant moussant', slug: 'foam-cleanser' },
          { name: 'Nettoyant en gel', slug: 'gel-cleanser' },
          { name: 'Eau micellaire', slug: 'micellar-water' }
        ]
      },
      
      {
        subItems: 'Sérums',
        subSlug: 'serums',
        items: [
          { name: 'Sérum à la vitamine C', slug: 'vitamin-c-serum' },
          { name: 'Acide hyaluronique', slug: 'hyaluronic-acid' },
          { name: 'Sérum au rétinol', slug: 'retinol-serum' }
        ]
      },
      {
        subItems: 'Masques',
        subSlug: 'masks',
        items: [
          { name: 'Masque à l\'argile', slug: 'clay-mask' },
          { name: 'Masque en feuille', slug: 'sheet-mask' },
          { name: 'Masque de nuit', slug: 'sleeping-mask' }
        ]
      }
    ]
  },

  {
    title: 'Lots',
    slug: 'bundles',
    sectionItems: [
      {
        subItems: 'Ensembles soins de la peau',
        subSlug: 'skincare-sets',
        items: [
          { name: 'Kit anti-âge', slug: 'anti-aging-kit' },
          { name: 'Ensemble traitement acné', slug: 'acne-treatment-set' },
          { name: 'Lot éclaircissant', slug: 'brightening-bundle' }
        ]
      },
      {
        subItems: 'Ensembles soins du corps',
        subSlug: 'bodycare-sets',
        items: [
          { name: 'Ensemble spa relaxation', slug: 'relaxation-spa-set' },
          { name: 'Kit exfoliation', slug: 'exfoliation-kit' },
          { name: 'Pack hydratation', slug: 'hydration-pack' }
        ]
      },
      
     
    ]
  },

  {
    title: 'Maquillage',
    slug: 'makeup',
    sectionItems: [
      {
        subItems: 'Fond de teint',
        subSlug: 'foundation',
        items: [
          { name: 'Fond de teint liquide', slug: 'liquid-foundation' },
          { name: 'Fond de teint crème', slug: 'cream-foundation' },
          { name: 'Hydratant teinté', slug: 'tinted-moisturizer' }
        ]
      },
      {
        subItems: 'Rouge à lèvres',
        subSlug: 'lipstick',
        items: [
          { name: 'Rouge à lèvres mat', slug: 'matte-lipstick' },
          { name: 'Rouge à lèvres brillant', slug: 'glossy-lipstick' },
          { name: 'Baume teinté', slug: 'tinted-balm' }
        ]
      },
      {
        subItems: 'Fard à paupières',
        subSlug: 'eyeshadow',
        items: [
          { name: 'Palette', slug: 'palette' },
          { name: 'Nuance unique', slug: 'single-shade' },
          { name: 'Fard à paupières crème', slug: 'cream-eyeshadow' }
        ]
      },
      
    ]
  },

  {
    title: 'Parfums',
    slug: 'parfums',
    sectionItems: [
      {
        subItems: 'Parfum Femme',
        subSlug: 'floral',
        items: [
          { name: 'Parfum rose', slug: 'rose-perfume' },
          { name: 'Parfum jasmin', slug: 'jasmine-scent' },
          { name: 'Brume lavande', slug: 'lavender-mist' }
        ]
      },
      {
        subItems: 'Parfum Homme',
        subSlug: 'oriental',
        items: [
          { name: 'Essence vanille', slug: 'vanilla-essence' },
          { name: 'Santal', slug: 'sandalwood' },
          { name: 'Épice ambre', slug: 'amber-spice' }
        ]
      },
      
    ]
  }
];


export default function NavigationSection() {

  const [onHover, setOnHover] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<{ title: string, items: any[] } | null>(null);

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
                  onClick={() =>  router.push(`/${item.slug}`) }
                />

                {onHover === item.title && (
                  <div
                    className="absolute top-full bg-white z-50 border-t border-gray-300 min-h-[150px] shadow-sm"
                    style={{ left: 'calc(-50vw + 50%)', width: '100vw' }}
                    onMouseLeave={() => {
                      setOnHover(null);
                      setSelectedSection(null);
                    }}
                  >
                    <div className="max-w-[1700px] mx-auto px-8 py-8 flex items-start gap-12">

                      <div className="flex gap-x-32 justify-center flex-1">

                        {/* Navigation Subtitle */}
                        {item.sectionItems?.map((section) => (
                          <div key={section.subItems} className="flex flex-col">

                            <button
                              onClick={() => setSelectedSection({ title: section.subItems, items: section.items })}
                              className={`text-lg font-semibold mb-1 uppercase tracking-wide text-left transition-colors ${selectedSection?.title === section.subItems ? 'text-black' : 'text-[#444444] hover:text-black'
                                }`}
                            >
                              {section.subItems}
                            </button>
                            <div className={`border-t mb-3 transition-all duration-300 ${selectedSection?.title === section.subItems ? 'border-black w-full' : 'border-gray-300 w-12 group-hover:w-full'
                              }`}></div>

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

                      {/* Product Preview Section - Appears on Selection */}
                      {selectedSection && (
                        <div className="shrink-0">
                          <ProductPreview title={selectedSection.title} items={selectedSection.items} />
                        </div>
                      )}

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