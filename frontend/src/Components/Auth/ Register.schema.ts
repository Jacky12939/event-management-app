import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nom trop court"),

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