import { SendHorizontal } from "lucide-react"
import Image from "next/image"

export default function Footer() {

return (
  <div>
  <footer className="bg-gray-200 border-t border-gray-300 relative">
    <div className="py-12 p-5 grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
 

        {/* Colonne à gauche */}
        <div className="space-y-7 flex flex-col items-center ">
            <h2 className="font-bold text-2xl ">A PROPOS </h2>
            <span>Nos points de vente</span>
            <span>Contactez-nous</span>
             <span>Livraison et retours gratuits</span>
             <span>Avis client</span>
            <span>Cadeaux d'entreprises</span>
            <span>Presse</span>
            <span>Normes de l'entreprise</span>


        </div>

        {/* Colonne de gauche */}
        <div className="space-y-7 flex flex-col items-center">
            <h2 className="font-bold text-2xl"> AIDE </h2>
             <span>Vos questions fréquentes</span>
             <span>Notre Histoire</span>
            <span>Conditions générales</span>
            <span>Charte de confidentialité</span>
            <span>Nos produits</span>
             <span>Affiliation</span>
            <span>Rejoindre l'équipe</span>
        </div>

        {/* Colonne de la Newsletter  */}
        <div className="absolute right-10 py-10 p-5 mx-auto">
          <div className="flex flex-col items-center">
  
            <span className=" text-black font-bold mb-5">Recevez nos nouveautés par émail</span>
              <div className="flex space-x-3">

              <div className="rounded-sm bg-white outline-1 outline-black w-full max-h-[120px] py-3 p-6">
                <input 
                type="text"
                className=" outline-none appearance-none bg-transparent text-black"
                placeholder="Email"
              />           
              </div>
              <button className="py-2 px-2 bg-white outline-1 outline-blac pr-5k"><SendHorizontal size={25} /></button>
              </div>
            
            
          </div>

        </div>

    </div>
  </footer>

</div>

    )
}