"use server";

export const handleCreateProcess = async (formData: FormData) => {
  try {
    const formEntries = Array.from(formData.entries());
    console.log("Entradas del formulario:", formEntries);

    const data = Object.fromEntries(formData.entries());
    console.log("Datos del formulario enviados:", data);

    const companyId = parseInt(data.client as string, 10);

    console.log("ID de empresa seleccionado:", companyId);

    if (isNaN(companyId)) {
      throw new Error("ID de empresa inválido.");
    }

    const isValidDateString = (value: FormDataEntryValue): value is string => {
      return typeof value === "string" && !isNaN(Date.parse(value));
    };

    const mappedData = {
      job_offer: data.jobOffer,
      job_offer_description: data.jobOfferDescription,
      company_id: companyId,
      opened_at: isValidDateString(data.openedAt) ? new Date(data.openedAt) : null,
      closed_at: isValidDateString(data.closedAt) ? new Date(data.closedAt) : null,
      pre_filtered: data.preFiltered === 'true',
      status: data.status || 'pending',
    };

    console.log("Datos transformados del formulario:", mappedData);

    const response = await fetch("http://localhost:3001/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear el proceso:", errorData);
      throw new Error(errorData.error || "Error desconocido al crear el proceso");
    }

    const result = await response.json();
    console.log("Proceso creado exitosamente:", result);

    return {
      message: "Proceso cargado exitosamente",
      route: "/process",
    };

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el proceso:", error);
      throw new Error(`Error al crear el proceso: ${error.message || "Error desconocido"}`);
    } else {
      console.error("Error desconocido al crear el proceso:", error);
      throw new Error("Error desconocido al crear el proceso");
    }
  }
};
