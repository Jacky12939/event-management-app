import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { registerSchema, type RegisterFormData } from "./ Register.schema";



export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // 🔥 IMPORTANT
  });

  // 🔥 LIVE VALUES (pour couleur vert/rouge)
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: RegisterFormData) => {
    console.log("Données valides :", data);
  };

  // 🎨 LOGIQUE COULEUR SAAS
  const inputClass = (error?: string, value?: string) => `
  w-full
  rounded-lg
  pl-10
  py-3
  border
  outline-none
  transition-all
  bg-white dark:bg-slate-800 dark:text-white
  ${
    error
      ? "border-red-500 focus:ring-red-500"
      : value
      ? "border-green-500 focus:ring-green-500"
      : "border-gray-300 dark:border-slate-600 focus:ring-indigo-500"
  }
`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <h1 className="text-3xl font-bold text-center">
        Créer un compte
      </h1>

      {/* NAME */}
      <div className="relative">
        <FaUser className="absolute left-3 top-4 text-gray-400" />

        <input
          placeholder="Nom"
          {...register("name")}
          className={inputClass(errors.name?.message, name)}
        />
      </div>

      {/* EMAIL */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-4 text-gray-400" />

        <input
          placeholder="Email"
          {...register("email")}
          className={inputClass(errors.email?.message, email)}
        />
      </div>

      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* PASSWORD */}
      <div className="relative">
        <FaLock className="absolute left-3 top-4 text-gray-400" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          {...register("password")}
          className={`${inputClass(errors.password?.message, password)} pr-12`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {/* CONFIRM PASSWORD */}
      <div className="relative">
        <FaLock className="absolute left-3 top-4 text-gray-400" />

        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmation mot de passe"
          {...register("confirmPassword")}
          className={`${inputClass(
            errors.confirmPassword?.message,
            confirmPassword
          )} pr-12`}
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          className="absolute right-4 top-4 text-gray-500"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">
          {errors.confirmPassword.message}
        </p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
      >
        Créer un compte
      </button>

      <div className="flex justify-center gap-2 text-sm">
        <span>Déjà un compte ?</span>

        <Link
          to="/login"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Se connecter
        </Link>
      </div>
    </form>
  );
}