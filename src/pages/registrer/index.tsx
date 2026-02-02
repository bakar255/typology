import Footer from "@/components/footer"
import { useState } from "react"


export default function Registrer() {


    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");

    return (
   <div>
        <div className="flex items-center justify-center flex flex-col py-20 min-h-screen bg-gray-50">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-3xl font-bold text-center mb-6 playfair-family text-gray-800">Log in</h3>

                <form className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email"
                            placeholder="Enter your email address..."
                            className="w-full text-gray-600 p-3 rounded-lg border-1 border-black focus:border-pink-500  focus:outline-none transition-colors text-sm"  
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password"
                            placeholder="Enter your password"
                            className="w-full text-gray-600 p-3 rounded-lg border-1 border-black focus:border-pink-500 focus:outline-none transition-colors text-sm"  
                        />
                    </div>

                    <button 
                        type="submit"
                        className="py-3 w-full bg-pink-500  text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Continue
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Vous n'avez pas de compte? 
                        <a href="#" className="text-pink-600 hover:text-pink-600 font-medium ml-1">Inscrivez-vous</a>
                    </p>
                </div>
            </div>

        </div>
         <Footer/>

        </div>

    )
}