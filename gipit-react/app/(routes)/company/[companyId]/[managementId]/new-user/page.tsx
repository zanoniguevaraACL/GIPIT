"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { createUserManagement } from "@/app/actions/createUserManagement";

function Page() {
  const params = useParams();
  const managementId = params.managementId as string; 

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
      { type: "cancel", value: "Cancelar", href: `/management/${managementId}` },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => createUserManagement(formData, managementId)}
    />
  );
}

export default Page;
