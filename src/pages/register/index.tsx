import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token);
        router.push("/");
      } else {
        setError(data.message || "Erreur lors de l'inscription");
      }
    } catch {
      setError("Erreur de connexion, réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-[80vh] px-4 bg-[#fafafa]">
        <div className="bg-white border border-gray-200 p-10 w-full max-w-md">
          <h2 className="text-2xl font-medium playfair-family text-center mb-8">
            Créer un compte
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Prénom & Nom
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                placeholder="Marie Dupont"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="underline text-black">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
