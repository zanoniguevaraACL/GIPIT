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

  const previousValues = await fetchCandidateDetails(parseInt(candidateId));

  const fields: FormInputsRow = [
    {
      label: "Conocimientos técnicos",
      placeholder: "Inserte un valor numérico",
      type: "number",
      name: "techSkills",
      defaultValue: previousValues.clientNote.tech,
    },
    {
      label: "Habilidades blandas",
      placeholder: "Inserte un valor numérico",
      type: "number",
      name: "softSkills",
      defaultValue: previousValues.clientNote.soft,
    },
    {
      label: "Comentario",
      placeholder: "Inserte una nota",
      type: "textarea",
      name: "comment",
      defaultValue: previousValues.clientNote.comment,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  return <Modal rows={fields} onSubmit={handleDisqualify} title="Nueva Nota" />;
}

export default Page;
