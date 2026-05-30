// =============================================================
// src/Components/Auth/Register.schema.ts
// Schéma de validation Zod pour le formulaire d'inscription
// Ce fichier était correct — aucune modification du contenu
// Seul le nom de fichier (avec espace) était problématique
// =============================================================

import { z } from "zod";

export const registerSchema = z
  .object({
    nom: z.string().min(2, "Nom trop court"),
    prenom: z.string().min(2, "Prénom trop court"),

    email: z
      .string()
      .email("Email invalide")
      .regex(/@gmail\.com$/, "Utilisez un email @gmail.com"),

    password: z
      .string()
      .min(6, "Minimum 6 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,
        "Majuscule, minuscule et caractère spécial requis"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;