"use client";
export const dynamic = "force-dynamic";

import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { z } from "zod";

// Duplicación de companySchema dentro del componente de cliente
const companySchema = z.object({
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

function Page() {
  const fields: FormInputsRow = [
    {
      label: "Logo",
      placeholder: "Subir Logo",
      type: "file",
      name: "logo",
    },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
    },
    [
      { type: "cancel", value: "Cancelar", href: "/company" },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      title="Nuevo Cliente"
      rows={fields}
      onSubmit={handleCreateCompany}
      validationSchema={companySchema} // Usamos el esquema duplicado
    />
  );
}

export default Page;
