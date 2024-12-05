"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { handleCreateManagement } from "@/app/actions/handleCreateManagement";

function ManagementPage() {
  const params = useParams(); 
  const companyId = params.companyId as string; 

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

  return <Modal rows={fields} onSubmit={(formData) => handleCreateManagement(formData, companyId)} />;
}

export default ManagementPage;

