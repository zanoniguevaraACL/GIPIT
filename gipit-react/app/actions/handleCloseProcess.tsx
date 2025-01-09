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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "close",
					processId
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error al cerrar el proceso: ${response.statusText}`);
    }		

    const result = await response.json();
    return {
      message: result.message,
      route: result.route || `/process`,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Error al cerrar el proceso:", error);
    return {
      message: "Error inesperado al cerrar el proceso.",
      route: actualRoute,
      statusCode: 500,
    };
  }
}