"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation"; // Import useParams to get processId from URL
import { updateProcess } from "@/app/actions/updateProcess"; // Import the updateProcess function
import { fetchProcessDetails } from "@/app/actions/fetchProcess"; // Fetch process details

async function Page() {
  const { processId } = useParams(); // Get processId from URL

  if (!processId) {
    return <div>Error: No process ID provided in URL</div>;
  }

  const routeToRedirect = `/process/${processId}`;

  // Fetch process details
  const previousValues = await fetchProcessDetails(parseInt(processId));

  // Handle errors in fetching process details
  if (!previousValues || !previousValues.jobOffer) {
    console.error("Error: No job offer found for process ID:", processId);
    return (
      <div>
        <h2>Error: Could not fetch job offer details</h2>
        <a href={routeToRedirect}>Go back</a>
      </div>
    );
  }

  const fields: FormInputsRow = [
    {
      label: "Vacante", // Job offer field
      placeholder: "Describa el puesto de trabajo",
      type: "textarea",
      name: "jobOffer",
      defaultValue: previousValues.jobOffer, // Pre-fill with the fetched job offer
      height: "40svh",
    },
    [
      { type: "cancel", value: "Cerrar", href: routeToRedirect }, // Cancel redirects to the process page
      { type: "submit", value: "Guardar" }, // Save button to submit the form
    ],
  ];

  // Call updateProcess to update the job offer
  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => updateProcess(formData, processId)} // Submit the updated job offer
      title="Detalles de la Vacante"
    />
  );
}

export default Page;
