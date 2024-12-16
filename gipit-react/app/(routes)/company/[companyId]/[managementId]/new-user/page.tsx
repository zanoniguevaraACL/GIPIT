"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { createUserManagement } from "@/app/actions/createUserManagement";
import { userSchema } from "@/app/lib/validationSchemas";

function Page() {
  const params = useParams();
  const managementId = params.managementId as string;
  const companyId = params.companyId as string;
  
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
      label: "Cargo",
      placeholder: "Cargo del usuario",
      type: "text",
      name: "position",
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
