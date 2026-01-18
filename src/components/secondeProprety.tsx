
import Image from "next/image";

export default function SecondProprety() {
    return (
        <div className="text-center mt-11">

    <div className="container mx-auto max-w-7xl px-4 py-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    
    {/* Colonne de texte à gauche */}
       <div className="space-y-6 max-w-2xl">
        <h2 className="text-5xl font-bold text-black">DUO, TRIO ET KITS</h2>
        <p className="text-2xl text-black leading-relaxed">
          Découvrez nos duos et trios de soins et parfums, conçus pour répondre efficacement à vos besoins spécifiques.
        </p>
        <p className=" text-3xl text-black leading-relaxed">
          Chaque produit est soigneusement sélectionné et associé pour répondre efficacement à vos besoins personelles.
        </p>
        <p className="text-sm text-gray-600 italic">
          Disponible exclusivement en ligne.
        </p>
        </div>

        {/* Colonne d'image a droite */}
        <div>
          <Image 
          src="/coffret.webp"
          alt="coffret"
          width={600}
          height={500}
          className="max-w-5xl w-full object-cover max-h-[500px] h-full "
           />
        </div>

        <div className="flex justify-center gap-8 mt-8 mx-auto space-x-52">
        <div className="flex flex-col items-center">
        <Image 
          src="/red.webp"
          alt="redbox"
          width={500}
          height={300}
          className="max-w-5xl"
        />
        <span className="uppercase text-sm mt-2 ">
          IN THE SPOTLIGHT
        </span>
        <span className="playfair-family mt-4 text-2xl text-center mb-2">
          La meilleur box de l'année 2025
        </span>

        <span className="text-sm font-medium">
        Optez pour les produits qui travaillent plus dur – formulés par la marque qui sait créer une brillance qui attire tous les regards.
        </span>

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



  </div>
</div>
</div>
</div>
</div>

         
     )
}