"use server";

export const updateProcess = async (formData: FormData, processId: string) => {
  try {
    // Extraer jobOffer (descripción) desde los datos del formulario
    const jobOffer = formData.get("jobOffer") as string | null;

    // Asegurarse de que jobOffer sea proporcionado
    if (!jobOffer) {
      throw new Error("Falta el campo requerido: jobOffer");
    }

    const jobOfferDescription = jobOffer;

    // Preparar el payload para la solicitud de actualización
    const payload = {
      job_offer: jobOffer,
      job_offer_description: jobOfferDescription,
    };

    // Realizar la solicitud PUT para actualizar la oferta de trabajo para el processId dado
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/process/${processId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar la oferta de trabajo: ${errorText}`);
    }

    // Devolver mensaje de éxito y URL de redirección
    return {
      message: "Oferta de trabajo actualizada con éxito",
      route: `/process/${processId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error al actualizar la oferta de trabajo: ${error.message}`,
        route: `/process/${processId}`,
      };
    } else {
      console.error("Error desconocido:", error);
      return {
        message: "Ocurrió un error desconocido",
        route: `/process/${processId}`,
      };
    }
  }
};
