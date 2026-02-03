'use client';

import { SendHorizontal, Mail, Facebook, TwitchIcon, Twitter } from "lucide-react"
import { useState } from "react"
import Logo from "./ui/logo"
import Link from "next/link";

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

  const aboutUs = [
    { name: 'Nos points de vente', href: '#' },
    { name: 'Contactez-nous', href: '#' },
    { name: 'Livraison et retours gratuits', href: '#' },
    { name: 'Avis client', href: '#' },
    { name: 'Cadeaux d\'entreprises', href: '#' },
    { name: 'Presse', href: '#' },
    { name: 'Normes de l\'entreprise', href: '#' },
  ]

  const help = [
    { name: 'Vos questions fréquentes', href: '#' },
    { name: 'Notre Histoire', href: '#' },
    { name: 'Conditions générales', href: '#' },
    { name: 'Charte de confidentialité', href: '#' },
    { name: 'Nos produits', href: '#' },
    { name: 'Affiliation', href: '#' },
    { name: 'Rejoindre l\'équipe', href: '#' },
  ]

  return (
    <div>
        <div className="flex w-screen h-30 bg-[#f8efdf] ">

          <div className="flex  items-center justify-center">
            
            <Mail size={26} className="ml-12"/>
          <p className="ml-5 text-1xl text-foreground leading-5 tracking-tight uppercase">
              Soyez un des premiers à être informé à propos de nos derniers arrivages, tendances ainsi que nos offres exclusive.
           </p>

           <Link href="/register" className="rounded-s-xs py-3 ml-15 px-2 bg-black text-white cursor-pointer">S'inscrire </Link>
          </div>
            <div className="flex items-center ml-56 justify-end">
              <p className="ml-10 text-1xl text-foreground leading-5 tracking-tight uppercase mr-4">
                CONNECT WITH US
              </p>
              <div className="flex space-x-4 ml-5">
                <Facebook size={24} className="cursor-pointer hover:text-blue-600" />
                <Twitter size={24} className="cursor-pointer hover:text-blue-400" />
              </div>
           </div>
        </div>

      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <div className="py-16 px-16 grid md:grid-cols-2 lg:grid-cols-5 mx-auto">

            
             <div>
               <span className="heading text-2xl">Typology Paris</span>
                <p className="text-gray-600 text-xs mt-2 mr-5 tracking-wider">
                TYPOLOGY PARIS® est le meilleur site français ayant une large collections de produits luxurieux avec une selection de plus 100 produits de marques prestigieuse venue du monde entier.
                </p>
              
             </div>


          <div className="space-y-2 text-gray-600 flex flex-col items-start">
            <h2 className="text-1xl text-muted-foreground  text-gray-800">Information</h2>
             {information.map((item) => (
              <div key={item}>
                <span className="text-sm cursor-pointer">{item}</span> 
              </div>
             ))}
          </div>
 
          <div className="space-y-6 flex flex-col items-start">
            <h2 className="text-1xl text-gray-800 mb-4">À propos de nous</h2>
            <div className="space-y-3 text-gray-600 text-sm">
              {aboutUs.map((link) => (
                <a key={link.name} href={link.href} className="block hover:text-gray-800 transition-colors duration-200">{link.name}</a>
              ))}
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-start">
            <h2 className=" text-1xl text-muted-foreground text-gray-800 mb-4">Aide</h2>
            <div className="space-y-3 text-gray-600 text-sm">
              {help.map((link) => (
                <a key={link.name} href={link.href} className="block hover:text-gray-800 transition-colors duration-200">{link.name}</a>
              ))}
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