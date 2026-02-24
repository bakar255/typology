
import Image from "next/image";

export default function SecondProprety() {
    return (
        <div className="text-center mt-1">

    <div className="container mx-auto max-w-7xl px-4 py-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    
  

        <div className="flex justify-center gap-8 mt-8 mx-auto space-x-52">
        <div className="flex flex-col items-center">
        <Image 
          src="/red.webp"
          alt="redbox"
          width={500}
          height={300}
          className="max-w-5xl"
        />
        <span className="uppercase text-sm font-medium mt-2 ">
          IN THE SPOTLIGHT
        </span>
        <span className="playfair-family mt-4 font-medium text-2xl text-center mb-2">
          La meilleur box de l'année 2025
        </span>

        <span className="text-sm font-medium">
        Optez pour les produits qui travaillent plus dur – formulés par la marque qui sait créer une brillance qui attire tous les regards.
        </span>

        <button className=" mt-5 border border-black py-2 px-4 font-medium cursor-pointer">En savoir plus</button>

      </div>

  <div className="flex flex-col items-center">
    <Image 
      src="/box.webp"
      alt="box"
      width={500}
      height={300}
      className="max-w-5xl"
    />
  
    <span className="uppercase text-sm mt-2 ">
          ON the wishlist
        </span>
        <span className="playfair-family mt-4 text-2xl text-center mb-2">
          La meilleur box de l'année 2024
        </span>

        <span className="text-sm font-medium">
        Faites des économies avec les coffrets de soins capillaires RED, adaptés à tous les types et textures de cheveux.
        </span>

        <button className=" mt-5 border border-black py-2 px-4 font-medium cursor-pointer">En savoir plus</button>
  </div>
</div>
</div>
</div>
</div>

         
     )
}