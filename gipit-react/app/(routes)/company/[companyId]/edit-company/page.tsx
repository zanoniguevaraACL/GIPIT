import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { fetchCDetails } from "@/app/actions/fakeApi";

async function Page({ params }: { params: { companyId: string } }) {
  const { companyId } = params;
  const routeToRedirect = `/company/${companyId}`;

  const previousValues = await fetchCDetails(parseInt(companyId));

  const fields: FormInputsRow = [
    { label: "Logo", type: "file", name: "logo" },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
      defaultValue: previousValues.name,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
      defaultValue: previousValues.description,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return <Modal rows={fields} onSubmit={handleCreateCompany} />;
}

export default Page;
