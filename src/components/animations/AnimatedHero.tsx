

export default function SecondeHero() {


    return (
        <div className="w-full h-screen max-h-[800px] relative"> 
            <video
                muted
                loop
                autoPlay
                className="w-full h-full object-cover object-center brightness-105"
            >
                <source src="/makeup.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 z-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white text-5xl mb-8 font-bold">Découvrez votre peau !</h1>
                    <button className="text-black py-3 px-8 rounded-sm cursor-pointer bg-white hover:bg-gray-100 transition font-semibold">
                        Voir les produits
                    </button>
                </div>
            </div>
        </div>
    )
}