export const fetchCandidateDetails = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener candidato: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los detalles del candidato:", error);
    throw error;
  }
};

export const updateCandidateDetails = async (candidateId: string, formData: FormData) => {
  // Implementa la lógica para actualizar los detalles del candidato
  const response = await fetch(`/api/candidates/${candidateId}`, {
    method: 'PUT',
    body: formData,
  });
  const data = await response.json();
  return data;
};