import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { fetchCandidateDetails } from "@/app/actions/fakeApi";

async function Page({
  params,
}: {
  params: { processId: string; candidateId: string };
}) {
  const { processId, candidateId } = params;
  const routeToRedirect = `/process/${processId}/${candidateId}`;

  const candidateDetails = await fetchCandidateDetails(parseInt(candidateId));

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
      defaultValue: candidateDetails.name,
    },
    {
      label: "Teléfono",
      placeholder: "+56 000 00000",
      type: "text",
      name: "phone",
      defaultValue: candidateDetails.phone,
    },
    {
      label: "Correo electrónico",
      placeholder: "correo@server.com",
      type: "email",
      name: "email",
      defaultValue: candidateDetails.email,
    },
    {
      label: "Dirección",
      placeholder: "# Calle, Ciudad, País",
      type: "text",
      name: "address",
      defaultValue: candidateDetails.address,
    },
    {
      label: "CV",
      placeholder: "Detalles del cv",
      type: "textarea",
      name: "cv",
      defaultValue: candidateDetails.sumary,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  return (
    <Modal rows={fields} onSubmit={handleDisqualify} title="Nuevo Candidato" />
  );
}

export default Page;