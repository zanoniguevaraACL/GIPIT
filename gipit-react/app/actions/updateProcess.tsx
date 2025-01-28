"use server";

export const updateProcess = async (formData: FormData, processId: string) => {
  try {
    const name = formData.get("name") as string | null;
    const jobOffer = formData.get("jobOffer") as string | null;

    if (!name || !jobOffer) {
      throw new Error("Faltan campos requeridos: name y jobOffer");
    }

    const payload = {
      name: name,
      job_offer: jobOffer,
      job_offer_description: jobOffer,
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
      throw new Error(`Error al actualizar el proceso: ${errorText}`);
    }

    return {
      message: "Proceso actualizado exitosamente",
      route: `/process/${processId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error al actualizar el proceso: ${error.message}`,
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
