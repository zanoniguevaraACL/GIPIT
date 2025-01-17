"use server";

export const handleCreateProcess = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const companyId = parseInt(data.client as string, 10);
    const managementId = parseInt(data.management_id as string, 10);

    console.log("Management ID -->", managementId);
    if (isNaN(companyId) || isNaN(managementId)) {
      throw new Error("ID de compañía o jefatura inválido.");
    }

    const isValidDateString = (value: FormDataEntryValue): value is string => {
      return typeof value === "string" && !isNaN(Date.parse(value));
    };

    const mappedData = {
      job_offer: data.jobOffer,
      job_offer_description: data.jobOfferDescription,
      managementId: managementId,
      opened_at: isValidDateString(data.openedAt) ? new Date(data.openedAt) : null,
      closed_at: isValidDateString(data.closedAt) ? new Date(data.closedAt) : null,
      pre_filtered: data.preFiltered === 'true',
      status: data.status || 'pending',
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error desconocido al crear el proceso");
    }

    await response.json();

    return {
      message: "Proceso cargado exitosamente",
      route: "/process",
    };

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al crear el proceso: ${error.message || "Error desconocido"}`);
    } else {
      throw new Error("Error desconocido al crear el proceso");
    }
  }
};
