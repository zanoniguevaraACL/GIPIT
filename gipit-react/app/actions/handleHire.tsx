"use server";

export const handleHire = async (
  formData: FormData,
  actualRoute: string
): Promise<{ message: string; route: string; statusCode: number }> => {
  const candidateId = Number(formData.get("candidateId") as string);
  const processId = formData.get("processId") as string;

  try {
    // Llamada al endpoint de tu backend para actualizar el candidato
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/candidate_process/${processId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "select", // Especifica la acción para contratar
          candidateId, // ID del candidato
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");
    return {
      message: result.message,
      route: routeToRedirect,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error al contratar el candidato:", error);
    return {
      message: "Error al contratar el candidato.",
      route: "/" + actualRoute.split("/").slice(1, 4).join("/"),
      statusCode: 500,
    };
  }
};