export const dynamic = "force-dynamic";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { companySchema } from "@/app/lib/validationSchemas";

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
      validationSchema={companySchema}
    />
  );
}

export default Page;
