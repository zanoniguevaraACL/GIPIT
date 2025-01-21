"use server";

export async function handleCreateNote(
  formData: FormData,
  actualRoute: string,
	candidateProcessId: number
): Promise<{ message: string; route: string; statusCode: number }> {
  const techSkills = formData.get("techSkills");
  const softSkills = formData.get("softSkills");
  const comment = formData.get("comment");

  console.log("Datos enviados al backend:", {
    candidate_process_id: Number(candidateProcessId),
    techSkills: techSkills ? Number(techSkills) : null,
    softSkills: softSkills ? Number(softSkills) : null,
    comment: comment || null,
  });

  if (!candidateProcessId) {
    console.error("ID de candidate_process no proporcionado.");
    return {
      message: "ID de candidate_process no proporcionado.",
      route: actualRoute,
      statusCode: 400,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate_process_id: Number(candidateProcessId),
        techSkills: techSkills ? Number(techSkills) : null,
        softSkills: softSkills ? Number(softSkills) : null,
        comment: comment || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la nota: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      message: result.message,
      route: actualRoute, // Recarga la misma página
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error al crear la nota:", error);
    return {
      message: "Error inesperado al crear la nota.",
      route: actualRoute,
      statusCode: 500,
    };
  }
}