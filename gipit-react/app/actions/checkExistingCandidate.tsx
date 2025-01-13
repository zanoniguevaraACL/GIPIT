export const checkExistingCandidate = async (
  processId: number,
  email: string,
  phone: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkCandidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ processId, email, phone }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error en la solicitud:", errorDetails);
      throw new Error(`Error al verificar el candidato: ${errorDetails}`);
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error("Error en checkExistingCandidate:", error);
    throw error;
  }
};