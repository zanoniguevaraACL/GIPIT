import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "El nombre solo puede contener letras, números, espacios, puntos y guiones",
    }),
  email: z.string().email("El correo electrónico debe ser válido"),
  role: z.string().min(2, "El rol debe tener mínimo 2 caracteres"),
});

export const companySchema = z.object({
  logo: z.instanceof(File).optional(),
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "El nombre solo puede contener letras, números, espacios, puntos y guiones",
    }),
  description: z
    .string()
    .min(3, "La descripción debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "La descripción solo puede contener letras, números, espacios, puntos y guiones",
    }),
});

export const managementSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "El nombre solo puede contener letras, números, espacios, puntos y guiones",
    }),
  description: z
    .string()
    .min(3, "La descripción debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "La descripción solo puede contener letras, números, espacios, puntos y guiones",
    }),
});
