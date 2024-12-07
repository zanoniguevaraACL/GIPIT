"use server";
export const createCandidateAction = async (
  formData: FormData,
  processId: number
) => {
  // Convertir FormData a un objeto JSON

  const data = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    jsongpt_text: formData.get("jsongpt_text") as string,
    process_id: processId, // Pasamos el `processId` para asociar al candidato con el proceso.
    technical_skills: formData.get("technical_skills") as string,
    soft_skills: formData.get("soft_skills") as string,
    client_comments: formData.get("client_comments") as string,
    match_percent: Number(formData.get("match_percent")),
    interview_questions: formData.get("interview_questions") as string,
  };

  try {
    // Llamada al endpoint de tu backend para crear un candidato
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/candidates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: "Candidato y relación con el proceso creados exitosamente",
      result: result,
    };
  } catch (error) {
    console.error(
      "Error al llamar al endpoint de creación de candidato:",
      error
    );
    return {
      success: false,
      message: "Error al crear el candidato o asociarlo con el proceso.",
    };
  }
};
