"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation"; // Import useParams to get the processId from the URL
import { updateProcess } from "@/app/actions/updateProcess"; // Import the updateProcess function
import { fetchProcessDetails } from "@/app/actions/fetchProcess"; // Fetch process details

function Page() {
  const { processId } = useParams(); // Get processId from the URL
  const [previousValues, setPreviousValues] = useState<FormInputsRow | null>(null); // State to store process details
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    if (processId) {
      // Ensure processId is a string, not an array
      const processIdStr = Array.isArray(processId) ? processId[0] : processId;

      const fetchDetails = async () => {
        try {
          const details = await fetchProcessDetails(parseInt(processIdStr)); // parseInt with the string version of processId
          if (!details || !details.jobOffer) {
            setError("No se encontró la oferta de trabajo para el ID del proceso.");
            return;
          }
          setPreviousValues([
            {
              label: "Vacante", // Job offer field
              placeholder: "Describa el puesto de trabajo",
              type: "textarea",
              name: "jobOffer", // Field name for the job offer
              defaultValue: details.jobOffer, // Pre-fill with the fetched job offer
              height: "40svh",
            },
            [
              { type: "cancel", value: "Cerrar", href: `/process/${processIdStr}` }, // Cancel button redirects to the process
              { type: "submit", value: "Guardar" }, // Submit button to save the form
            ],
          ]);
        } catch (error) {
          console.error("Error fetching process details:", error);
          setError("Error al obtener los detalles del proceso.");
        }
      };

      fetchDetails();
    }
  }, [processId]);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <a href={`/process/${processId}`}>Volver</a> {/* Link to go back to the process */}
      </div>
    );
  }

  if (!previousValues) {
    return <div>Cargando...</div>; // Loading state while data is being fetched
  }

  // Ensure processId is passed as a string to updateProcess
  const processIdStr = Array.isArray(processId) ? processId[0] : processId;

  return (
    <Modal
      rows={previousValues}
      onSubmit={(formData) => updateProcess(formData, processIdStr)} // Pass the correctly typed processId
      title="Detalles de la Vacante"
    />
  );
}

export default Page;
