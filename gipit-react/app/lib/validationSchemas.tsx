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
  position: z.string().min(2, "El rol debe tener mínimo 2 caracteres"),
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


export const candidateSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ .-]+$/, {
      message:
        "El nombre solo puede contener letras, espacios, puntos y guiones",
    }),
  email: z.string().email("El correo electrónico debe ser válido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener mínimo 7 caracteres")
    .regex(/^[0-9]+$/, {
      message: "El teléfono solo puede contener números",
    }),
  address: z.string().min(5, "La dirección debe tener mínimo 5 caracteres"),
  cv: z
  .custom<File | null>((value) => value instanceof File, {
    message: "Debe subir un archivo de CV",
  })
  .refine((file) => file !== null && file.size > 0 && file.name.trim() !== "", {
    message: "Debe subir un archivo válido de CV",
  }),
});

export const editCandidateSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ .-]+$/, {
      message:
        "El nombre solo puede contener letras, espacios, puntos y guiones",
    }),
  email: z.string().email("El correo electrónico debe ser válido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener mínimo 7 caracteres")
    .regex(/^[0-9]+$/, {
      message: "El teléfono solo puede contener números",
    }),
  address: z.string().min(5, "La dirección debe tener mínimo 5 caracteres"),
});

export const processSchema = z.object({
  client: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Selecciona un cliente válido",
    }),
  jobOffer: z
    .string()
    .min(1, "El perfil buscado es obligatorio")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "El perfil solo puede contener letras, números, espacios, puntos y guiones",
    }),
    jobOfferDescription: z
    .string()
    .min(1, "La descripción de la vacante es obligatoria"), // Solo valida que no esté vacío,
});