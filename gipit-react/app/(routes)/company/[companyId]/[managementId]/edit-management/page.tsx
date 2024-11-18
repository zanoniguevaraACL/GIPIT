import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { fetchCDetails } from "@/app/actions/fakeApi";

async function Page({
  params,
}: {
  params: { companyId: string; managementId: string };
}) {
  const { companyId, managementId } = params;
  const routeToRedirect = `/company/${companyId}`;

  const previousValues = await fetchCDetails(parseInt(companyId));

  let managementIndex = 0;

  previousValues.jefaturas.forEach((jef, index) => {
    if (jef.id == parseInt(managementId)) {
      managementIndex = index;
    }
  });

  const fields: FormInputsRow = [
    { label: "Logo", type: "file", name: "logo" },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
      defaultValue: previousValues.jefaturas[managementIndex].name,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
      defaultValue: previousValues.jefaturas[managementIndex].description,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return <Modal rows={fields} onSubmit={handleCreateCompany} />;
}

export default Page;
