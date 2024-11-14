import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { fetchAllC } from "@/app/actions/fakeApi";

async function Page() {
  const clientsList = await fetchAllC();
  console.log(clientsList);
  const selectFieldOptions = clientsList.map((client) => ({
    name: client.name,
    value: client.id,
  }));

  const fields: FormInputsRow = [
    {
      label: "Cliente",
      placeholder: "Seleccionar cliente",
      type: "select",
      name: "client",
      options: selectFieldOptions,
    },
    {
      label: "Perfil buscado",
      placeholder: "Perfil buscado",
      type: "text",
      name: "jobOffer",
    },
    {
      label: "Descripción de la vacante",
      name: "jobOfferDescription",
      placeholder: "Descripción de la vacante",
      type: "textarea",
      height: "40svh",
    },
    [
      { type: "cancel", value: "Cancelar", href: "/process" },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal rows={fields} onSubmit={handleCreateCompany} title="Nuevo Proceso" />
  );
}

export default Page;
