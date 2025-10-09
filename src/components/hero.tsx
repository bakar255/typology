import Image from "next/image";
import { useState } from "react";

export default function hero() {

    const [currentImage, setCurrentImage] = useState(0);
    const images = ["/makeup.webp", "/makeup2.jpg"];

    const nextImage = () => {
      setCurrentImage((prev) => (prev + 1) % images.length )
    };


    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImage(index);
    };

    return (
      <div className="relative w-full h-[70vh] mt-20">
      <Image
        src={images[currentImage]}
        alt="Makeup Hero"
        className="object-cover object-center"
        fill
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        
        <button 
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform cursor-pointer -translate-y-1/2 w-12 h-12 bg-white bg-opacity-50 text-black rounded-full flex items-center justify-center text-xl font-bold hover:bg-opacity-70 transition-all">
        ←
      </button>

      <button 
      onClick={nextImage}
      className="absolute right-4 top-1/2 transform cursor-pointer -translate-y-1/2 w-12 h-12 bg-white bg-opacity-50 text-black rounded-full flex items-center justify-center text-xl font-bold hover:bg-opacity-70 transition-all">
        →
      </button>
     
        <div className="text-center text-[#fdcd95] max-w-4xl px-6">
          <span className="bg-transparent backdrop-blur-lg rounded-lg font-semibold py-1 p-4">Typeaulogy Paris</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Votre Beauté Naturelle
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md">
            Découvrez nos produits cosmétiques naturels et efficaces, 
            conçus pour révéler votre éclat authentique
          </p>
          <button className="bg-[#fdcd95] text-black px-8 py-4 cursor-pointer rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Découvrir nos produits
          </button>
        </div>
        
        {/* Indicateurs de navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-5 h-2 rounded-lg transition-opacity cursor-pointer ${
                index === currentImage ? 'bg-white opacity-80' : 'bg-white opacity-40'
              }`}
            />
          ))}
        </div>

      </div>
      
    </div>
    )
}