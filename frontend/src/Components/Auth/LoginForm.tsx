import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      // 🎯 Validation stricte pour calmer le linter TypeScript
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Identifiants incorrects");
      } else {
        setError("Connexion impossible, vérifiez votre réseau");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-center">Connexion</h1>
        <p className="text-gray-500 text-center mt-2">Bon retour</p>
      </div>

      {/* Affichage des erreurs de connexion */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center font-medium">
          {error}
        </div>
      )}

      <div className="relative">
        <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg pl-10 py-3 outline-none focus:border-indigo-500 transition-all"
          required
        />
      </div>

      <div className="relative">
        <FaLock className="absolute left-3 top-4 text-gray-400" />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg pl-10 py-3 outline-none focus:border-indigo-500 transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium"
      >
        Se connecter
      </button>

      <p className="text-center text-sm">
        Pas de compte ?
        <Link to="/register" className="text-indigo-600 font-semibold ml-2 hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}