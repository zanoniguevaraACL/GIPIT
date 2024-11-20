import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { fetchProcessDetails } from "@/app/actions/fetchProcess";

async function Page({ params }: { params: { processId: string } }) {
  const { processId } = params;
  const routeToRedirect = `/process/${processId}`;

  const previousValues = await fetchProcessDetails(parseInt(processId));

  // transforma a string vacio si es nulo
  const jobOffer = previousValues?.jobOffer ?? "";

  const fields: FormInputsRow = [
    {
      label: "Vacante",
      placeholder: "Descripa el puesto de trabajo",
      type: "textarea",
      name: "jobOffer",
      defaultValue: jobOffer,
      height: "40svh",
    },
    [
      { type: "cancel", value: "Cerrar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={handleDisqualify}
      title="Detalles de la Vacante"
    />
  );
}

export default Page;
