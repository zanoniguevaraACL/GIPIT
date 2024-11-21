import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { fetchProcessDetails } from "@/app/actions/fetchProcess";

async function Page({ params }: { params: { processId: string } }) {
  const { processId } = params;
  const routeToRedirect = `/process/${processId}`;

  // Fetch process details and check for errors
  const previousValues = await fetchProcessDetails(parseInt(processId));

  // Check if previousValues is null or missing properties
  if (!previousValues || !previousValues.jobOffer) {
    console.error("Error: No job offer found for process ID:", processId);
    // Handle error or return an error page here
    return (
      <div>
        <h2>Error: Could not fetch job offer details</h2>
        <a href={routeToRedirect}>Go back</a>
      </div>
    );
  }

  const fields: FormInputsRow = [
    {
      label: "Vacante",
      placeholder: "Describa el puesto de trabajo",
      type: "textarea",
      name: "jobOffer",
      defaultValue: previousValues.jobOffer, // Safe to use after the check
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
