
export default function SecondProprety() {
    return (
        <div className="text-center mt-11">

    <div className="container mx-auto px-4 py-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    
    {/* Colonne de texte à gauche */}
       <div className="space-y-6 max-w-2xl">
        <h2 className="text-7xl font-bold text-black">DUO, TRIO ET KITS</h2>
        <p className="text-4xl text-black leading-relaxed">
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
          <img 
          src="coffret.webp"
          alt="coffret"
          className="max-w-5xl w-full object-cover max-h-[500px] h-full "
           />
        </div>

            </div>
          </div>
        </div>
     )
}