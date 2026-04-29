import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    src: "/coffret1.webp",
    href: "/collection/liquid-foundation",
    label: "IN THE SPOTLIGHT",
    title: "La meilleur box de l'année 2025",
    description:
      "Optez pour les produits de beauté qui travaillent plus dur – formulés par la marque qui sait créer une brillance qui attire tous les regards.",
    cta: "En savoir plus",
  },
  {
    src: "/box.webp",
    href: "/collection/makeup-gift-set",
    label: "ON THE WISHLIST",
    title: "La meilleur box de l'année 2024",
    description:
      "Faites des économies avec les coffrets de soins capillaires RED, adaptés à tous les types et textures de cheveux.",
    cta: "En savoir plus",
  },
  {
    src: "/red.webp",
    href: "/collection/anti-aging-kit",
    label: "FEATURED",
    title: "Les essentiels beauté 2025",
    description:
      "Découvrez notre sélection de produits anti-âge de la saison pour sublimer votre routine quotidienne.",
    cta: "Découvrir",
  },
  {
    src: "/box.webp",
    href: "/collection/vitamin-c-serum",
    label: "NEW ARRIVALS",
    title: "Collection Printemps 2025",
    description:
      "Des nouveautés fraîches et légères pour accueillir la belle saison avec éclat et légèreté.",
    cta: "Voir la collection",
  },
  {
    src: "/carousel 1.avif",
    href: "/collection/makeup-gift-set",
    label: "TENDANCE",
    title: "Les Must-Have de la saison",
    description:
      "Explorez notre sélection de produits tendance, soigneusement choisis pour sublimer votre routine beauté.",
    cta: "Découvrir",
  },
  {
    src: "/carousel 2.avif",
    href: "/collection/gel-moussant",
    label: "EXCLUSIVITÉ",
    title: "Nouveautés en exclusivité",
    description:
      "Soyez les premiers à découvrir nos dernières arrivées, disponibles en avant-première sur notre boutique.",
    cta: "Voir les nouveautés",
  },
];

export default function SecondProprety() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemsPerView = isMobile ? 1 : 2;
  const maxIndex = slides.length - itemsPerView;
  const slidePercent = 100 / itemsPerView;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="py-16 mb-45 px-6 max-w-7xl mx-auto">
      {/* Header row */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="uppercase text-xs tracking-[0.2em] text-gray-400 font-medium">
            Sélection du moment
          </span>
          <h2 className="playfair-family text-3xl mt-1">Nos Coups de Cœur</h2>
        </div>

        {/* Arrow navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-200 disabled:opacity-25 cursor-pointer"
            aria-label="Précédent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-200 disabled:opacity-25 cursor-pointer"
            aria-label="Suivant"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * slidePercent}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ minWidth: `${slidePercent}%` }}
              className={`${i === 0 ? "pr-4" : i === slides.length - 1 ? "pl-4" : "px-4"}`}
            >
              <div className="flex flex-col group cursor-pointer">
                {/* Image */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>

                {/* Content */}
                <div className="pt-5">
                  <span className="uppercase text-[10px] tracking-[0.2em] text-gray-400 font-medium">
                    {slide.label}
                  </span>
                  <h3 className="playfair-family text-xl mt-2 mb-3 leading-snug text-gray-900">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 font-light">
                    {slide.description}
                  </p>
                  <Link 
                    href={slide.href}
                    className="border border-black px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer inline-block"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-10 flex gap-1.5">
        {slides.map((slide, i) => (
          <Link
            href={slide.href}
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(i);
            }}
            className="h-[1.5px] flex-1 cursor-pointer transition-colors duration-300 block"
            style={{ backgroundColor: i === currentIndex ? "#111" : "#e5e7eb" }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
