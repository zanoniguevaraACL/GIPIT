"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { handleCreateManagement } from "@/app/actions/handleCreateManagement";
import { z } from "zod";

function ManagementPage() {
  const params = useParams();
  const companyId = params.companyId as string;

  const managementSchema = z.object({
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

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre de la jefatura",
      type: "text",
      name: "name",
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada a la jefatura",
      type: "textarea",
    },
    [
      { type: "cancel", value: "Cancelar", href: `/company/${companyId}` },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => handleCreateManagement(formData, companyId)}
      validationSchema={managementSchema}
    />
  );
}

export default ManagementPage;
