import { SendHorizontal, Mail } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")

      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }



  const information = [
  'Aide', 'Retour de colis', 'Localiser mon colis',
  'Première livraison', 'Information sur nos emballages biodégradable',
  'Nos promotions',
  ]

  return (
    <div>
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <div className="py-16 px-16 grid md:grid-cols-2 lg:grid-cols-4 mx-auto">

          <div className="space-y-2 text-gray-600 flex flex-col items-start">
            <h2 className="text-1xl text-muted-foreground  text-gray-800">Information</h2>
             {information.map((item) => (
              <div>
                <span className="text-sm cursor-pointer">{item}</span> 
              </div>
             ))}
          </div>
 
          <div className="space-y-6 flex flex-col items-start">
            <h2 className="text-1xl text-gray-800 mb-4">À propos de nous</h2>
            <div className="space-y-3 text-gray-600 text-sm">
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Nos points de vente</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Contactez-nous</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Livraison et retours gratuits</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Avis client</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Cadeaux d&apos;entreprises</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Presse</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Normes de l&apos;entreprise</a>
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-start">
            <h2 className=" text-1xl text-muted-foreground text-gray-800 mb-4">Aide</h2>
            <div className="space-y-3 text-gray-600 text-sm">
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Vos questions fréquentes</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Notre Histoire</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Conditions générales</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Charte de confidentialité</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Nos produits</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Affiliation</a>
              <a href="#" className="block hover:text-gray-800 transition-colors duration-200">Rejoindre l&apos;équipe</a>
            </div>
          </div>

          {/*  Newsletter */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center lg:text-left">
                Recevez nos nouveautés
              </h3>
              <p className="text-gray-600 mb-6 text-center lg:text-left">
                Soyez les premiers informés de nos nouvelles collections et offres exclusives
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                    placeholder="Votre adresse email"
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 cursor-pointer hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>S&apos;abonner</span>
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </form>

              {isSubscribed && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-700 text-sm text-center">
                    ✅ Merci ! Vous êtes maintenant abonné à notre newsletter
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center lg:text-left">
                En vous abonnant, vous acceptez de recevoir nos emails marketing. 
                Vous pouvez vous désabonner à tout moment.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-5">
            <p className="text-center text-gray-500 text-sm">
              © Typology clone. Ce site n&apos;a aucun but lucratif. <br/> Il a été crée a titre personelles et les images ci-dessus appartiennent a leur détenteur respectif.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}