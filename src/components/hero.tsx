import Image from "next/image";
import { useState, useEffect } from "react";
import { MoveRight, MoveLeft, Play, Pause } from "lucide-react";

export default function hero() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    
    const images = [
        { src: "/makeup.webp", title: "Votre Beauté Naturelle", subtitle: "Découvrez nos produits cosmétiques naturels et efficaces, conçus pour révéler votre éclat authentique" },
        { src: "/makeup2.jpg", title: "Collection Premium", subtitle: "Des soins d'exception pour une peau radieuse et éclatante de santé" }
    ];

    const nextImage = () => {
        if (isTransitioning) return;
        setDirection('right');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
        }, 300);
    };

    const prevImage = () => {
        if (isTransitioning) return;
        setDirection('left');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
            setIsTransitioning(false);
        }, 300);
    };

    const goToImage = (index) => {
        if (isTransitioning || index === currentImage) return;
        setDirection(index > currentImage ? 'right' : 'left');
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImage(index);
            setIsTransitioning(false);
        }, 300);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlay(!isAutoPlay);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;
        
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlay, currentImage]);

    return (
        <div className="relative w-full h-[80vh] mt-20 overflow-hidden group">
            {/* Background  */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            index === currentImage
                          ? 'opacity-100 scale-100'
                              : index === (currentImage + 1) % images.length && direction === 'right'
                              ? 'opacity-0 scale-105 translate-x-full'
                              : index === (currentImage - 1 + images.length) % images.length && direction === 'left'
                                ? 'opacity-0 scale-105 -translate-x-full'
                                : 'opacity-0 scale-95'
                        }`}
                    >
                        <Image
                            src={image.src}
                            alt={`Hero ${index + 1}`}
                            className="object-cover object-center"
                            fill
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <button 
                    onClick={prevImage}
                    disabled={isTransitioning}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xl hover:bg-white/30 transition-all duration-300 group-hover:translate-x-2 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    <MoveLeft className="w-6 h-6" />
                </button>

                <button 
                    onClick={nextImage}
                    disabled={isTransitioning}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-xl hover:bg-white/30 transition-all duration-300 group-hover:-translate-x-2 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    <MoveRight className="w-6 h-6" />
                </button>

                <button
                    onClick={toggleAutoPlay}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                    {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <div className="text-center text-white max-w-4xl px-6">
                    <div className={`transition-all duration-700 ease-in-out ${
                        isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                    }`}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl animate-fade-in-up">
                            {images[currentImage].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-lg max-w-3xl mx-auto animate-fade-in-up-delay">
                            {images[currentImage].subtitle}
                        </p>
                        
                        <button className="border-black border-0 cursor-pointer text-black bg-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up-delay-2">
                            Découvrir la Collection
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            disabled={isTransitioning}
                            className={`relative transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${
                                index === currentImage 
                                    ? 'w-8 h-3 bg-white rounded-full shadow-lg' 
                                    : 'w-3 h-3 bg-white/60 rounded-full hover:bg-white/80 hover:scale-125'
                            }`}
                        >
                            {index === currentImage && (
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Progress Bar */}
                {isAutoPlay && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                        <div className="h-full bg-gradient-to-r from-black to-white animate-progress-bar" />
                    </div>
                )}
            </div>
        </div>
    );
}