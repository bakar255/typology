"use client";

import Footer from "@/components/footer"
import { useState } from "react"


export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");

    const handleLogin = async (e:any) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
            });

            const data = await res.json();
        
            if(res.ok) {
                alert(`Bienvenue`)
                console.log("Connecté", data);
            } else {
                console.error("err:", data.message || data.error);
            }
        }  catch (err) {
            console.error("Erreur")
        }
    }

    return (
   <div>
        <div className="flex items-center justify-center flex flex-col py-20 min-h-screen bg-gray-50">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h4 className="text-3xl  text-center mb-6 text-gray-800">Login</h4>

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
                        onClick={handleLogin}
                        className="py-3 w-full bg-pink-500  text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Continue
                    </button>
                </form>

                
            </div>

        </div>
         <Footer/>

        </div>

    )
}