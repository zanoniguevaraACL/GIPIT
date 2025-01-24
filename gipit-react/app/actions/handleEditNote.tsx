export async function handleEditNote(
  formData: FormData,
  candidateProcessId: number,
  routeToRedirect: string
): Promise<{ message: string; route: string; statusCode: number }> {
  try {
    const updates: Record<string, string | number> = {};

    for (const [key, value] of formData.entries()) {
      if (value) {
        const parsedValue = typeof value === "string" && !isNaN(Number(value)) ? Number(value) : value.toString();
        updates[key] = parsedValue;
      }
    }

    if (!candidateProcessId) {
      throw new Error("El ID del proceso del candidato es requerido.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateProcessId, ...updates }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al actualizar la nota.");
    }

    const result = await response.json();
    return { message: result.message, route: routeToRedirect, statusCode: 200 };
  } catch (error: unknown) {
    console.error("Error al editar la nota:", error);
    return {
      message: error instanceof Error ? error.message : "Error desconocido.",
      route: routeToRedirect,
      statusCode: 500,
    };
  }
}