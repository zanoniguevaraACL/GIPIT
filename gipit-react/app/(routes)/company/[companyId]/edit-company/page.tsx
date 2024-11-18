

"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation"; // Importa useParams para obtener el companyId
import { updateCompany } from "@/app/actions/updateCompany";

function Page() {
  const { companyId } = useParams(); // Obtiene companyId desde la URL

  // Asegúrate de que companyId sea un string
  const id = Array.isArray(companyId) ? companyId[0] : companyId;

  const fields: FormInputsRow = [
    { label: "Logo", type: "file", name: "logo" },
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

  // Llama a updateCompany pasando formData y companyId
  return <Modal rows={fields} onSubmit={(formData) => updateCompany(formData, id!)} />;
}

export default Page;
