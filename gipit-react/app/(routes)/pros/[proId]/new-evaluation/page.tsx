import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { fetchPro } from "@/app/actions/fakeApi";

async function Page({ params }: { params: { proId: string } }) {
  const { proId } = params;
  const routeToRedirect = `/pros/${proId}`;

  const proDetails = await fetchPro(parseInt(proId));

  const fields: FormInputsRow = [
    {
      label: "Fecha",
      placeholder: "Fecha de evaluación",
      type: "date",
      name: "date",
    },
    [
      {
        label: "Dominio del stack tecnológico",
        placeholder: "Número de 0-7",
        type: "number",
        name: "stack",
        minMax: [0, 7],
      },
      {
        label: "Habilidades de comunicación",
        placeholder: "Número de 0-7",
        type: "number",
        name: "comunicacion",
        minMax: [0, 7],
      },
    ],
    [
      {
        label: "Responsabilidad y cumplimiento",
        placeholder: "Número de 0-7",
        type: "number",
        name: "cumplimiento",
        minMax: [0, 7],
      },
      {
        label: "Proactividad y motivación",
        placeholder: "Número de 0-7",
        type: "number",
        name: "motivacion",
        minMax: [0, 7],
      },
    ],
    {
      label: "Comentario de la jefatura",
      placeholder: "Comentario de la jefatura",
      type: "textarea",
      name: "comment",
      minMax: [0, 7],
    },
    {
      label: "Acciones ACL",
      placeholder: "Acciones ACL",
      type: "textarea",
      name: "acciones",
      minMax: [0, 7],
    },
    {
      label: "Proyección del servicio",
      placeholder: "Proyección del servicio",
      type: "textarea",
      name: "acciones",
      minMax: [0, 7],
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={handleDisqualify}
      title={`Evaluación de ${proDetails.name}`}
    />
  );
}

export default Page;
