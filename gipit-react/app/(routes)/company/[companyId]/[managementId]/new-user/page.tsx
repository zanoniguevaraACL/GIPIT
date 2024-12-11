"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { createUserManagement } from "@/app/actions/createUserManagement";
import { z } from "zod";

function Page() {
  const params = useParams();
  const managementId = params.managementId as string;
  const companyId = params.companyId as string;

  const userSchema = z.object({
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

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del usuario",
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      placeholder: "Correo electrónico del usuario",
      type: "email",
      name: "email",
    },
    {
      label: "Rol",
      placeholder: "Rol del usuario",
      type: "text",
      name: "role",
    },
    [
      {
        type: "cancel",
        value: "Cancelar",
        href: `/company/${companyId}`,
      },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) =>
        createUserManagement(formData, companyId, managementId)
      }
      validationSchema={userSchema}
    />
  );
}

export default Page;
