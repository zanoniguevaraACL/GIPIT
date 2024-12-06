"use server";

export const updateProcess = async (formData: FormData, processId: string) => {
  try {
    const jobOffer = formData.get("jobOffer") as string | null;

    if (!jobOffer) {
      throw new Error("Falta el campo requerido: jobOffer");
    }

    const jobOfferDescription = jobOffer;

    const payload = {
      job_offer: jobOffer,
      job_offer_description: jobOfferDescription,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`, {
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

    return {
      message: "Oferta de trabajo actualizada con éxito",
      route: `/process/${processId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error al actualizar la oferta de trabajo: ${error.message}`,
        route: `/process/${processId}`,
      };
    } else {
      return {
        message: "Ocurrió un error desconocido",
        route: `/process/${processId}`,
      };
    }
  }
};
