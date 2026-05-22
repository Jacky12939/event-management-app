import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch {
      alert("Connexion impossible");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Connexion
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Bon retour
        </p>
      </div>

      <div className="relative">
        <FaEnvelope className="absolute left-3 top-4 text-gray-400" />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg pl-10 py-3 outline-none"
        />
      </div>

      <div className="relative">
        <FaLock className="absolute left-3 top-4 text-gray-400" />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg pl-10 py-3 outline-none"
        />
      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
        Se connecter
      </button>

      <p className="text-center text-sm">
        Pas de compte ?

        <Link
          to="/register"
          className="text-indigo-600 font-semibold ml-2"
        >
          Créer un compte
        </Link>
      </p>
    </form>
  );
}