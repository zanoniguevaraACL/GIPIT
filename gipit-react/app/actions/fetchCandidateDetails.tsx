export const fetchCandidateDetails = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
			cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener candidato: ${response.statusText}`);
    }

    const data = await response.json();
		console.log('DETALLE CANDIDATO SELECCIONADO EN PROCESOS--->', data)
    return data;
  } catch (error) {
    console.error('Error al obtener los detalles del candidato:', error);
    throw error;
  }
};

