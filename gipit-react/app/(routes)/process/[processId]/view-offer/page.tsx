"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation"; // Importar useParams para obtener el processId de la URL
import { updateProcess } from "@/app/actions/updateProcess"; // Importar la función updateProcess
import { fetchProcessDetails } from "@/app/actions/fetchProcess"; // Obtener los detalles del proceso

async function Page() {
  const { processId } = useParams(); // Obtener processId de la URL

  if (!processId) {
    return <div>Error: No se proporcionó el ID del proceso en la URL</div>; // Mensaje de error si no se pasa el processId
  }

  const routeToRedirect = `/process/${processId}`;

  // Obtener detalles del proceso
  const previousValues = await fetchProcessDetails(parseInt(processId));

  // Manejar errores al obtener los detalles del proceso
  if (!previousValues || !previousValues.jobOffer) {
    console.error("Error: No se encontró la oferta de trabajo para el ID del proceso:", processId);
    return (
      <div>
        <h2>Error: No se pudieron obtener los detalles de la oferta de trabajo</h2>
        <a href={routeToRedirect}>Volver</a> {/* Enlace para regresar al proceso */}
      </div>
    );
  }

  const fields: FormInputsRow = [
    {
      label: "Vacante", // Campo de la oferta de trabajo
      placeholder: "Describa el puesto de trabajo",
      type: "textarea",
      name: "jobOffer", // Nombre del campo para la oferta de trabajo
      defaultValue: previousValues.jobOffer, // Prellenar con la oferta de trabajo obtenida
      height: "40svh",
    },
    [
      { type: "cancel", value: "Cerrar", href: routeToRedirect }, // El botón de cancelar redirige al proceso
      { type: "submit", value: "Guardar" }, // Botón para guardar el formulario
    ],
  ];

  // Llamar a updateProcess para actualizar la oferta de trabajo
  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => updateProcess(formData, processId)} // Enviar la oferta de trabajo actualizada
      title="Detalles de la Vacante"
    />
  );
}

export default Page;
