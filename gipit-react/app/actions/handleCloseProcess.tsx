'use server';

export async function handleCloseProcess(
  formData: FormData,
  actualRoute: string
): Promise<{ message: string; route: string; statusCode: number }> {
  const processId = formData.get("processId");

  if (!processId) {
    console.error("processId está vacío.");
    return {
      message: "ID de proceso faltante.",
      route: actualRoute,
      statusCode: 400,
    };
  }

  try {
    // 1. Cierra el proceso
    const closeProcessResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "close",
          processId,
        }),
      }
    );

    if (!closeProcessResponse.ok) {
      throw new Error(
        `Error al cerrar el proceso: ${closeProcessResponse.statusText}`
      );
    }

    // 2. Crea el candidate_management
    const candidateManagementResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/candidate-management`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          processId, // Relación con el proceso cerrado
          action: "create",
        }),
      }
    );

    if (!candidateManagementResponse.ok) {
      throw new Error(
        `Error al crear candidate_management: ${candidateManagementResponse.statusText}`
      );
    }

    // 3. Procesa las respuestas
    const closeProcessResult = await closeProcessResponse.json();
    const candidateManagementResult = await candidateManagementResponse.json();

    return {
      message: `${closeProcessResult.message}. ${candidateManagementResult.message}`,
      route: closeProcessResult.route || `/process`,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error al manejar el cierre del proceso:", error);
    return {
      message: "Error inesperado al cerrar el proceso y crear candidate_management.",
      route: actualRoute,
      statusCode: 500,
    };
  }
}