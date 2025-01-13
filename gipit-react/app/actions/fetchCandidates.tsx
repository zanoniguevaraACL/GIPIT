interface CandidateResponse {
  id: number;
  name: string;
  role: string;
  client: string;
  start: string | null;
  end: string | null;
  rate: number;
  status: string;
}

export const fetchCandidates = async ({ page, query, status }: { page: number; query?: string; status?: string }) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);
    if (status) params.append('status', status);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/candidate_pros_management?${params.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los candidatos');
    }
    
    const data = await response.json();
    
    if (!data.batch || !Array.isArray(data.batch)) {
      console.error("Estructura inesperada en la respuesta de la API:", data);
      throw new Error('Se esperaba un array en batch en la respuesta de los candidatos');
    }

    const adaptedCandidates = data.batch.map((candidate: CandidateResponse) => {
      const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

      return {
        id: candidate.id,
        name: candidate.name,
        role: candidate.role,
        client: candidate.client,
        start: formatDate(candidate.start),
        end: formatDate(candidate.end),
        rate: candidate.rate,
        status: candidate.status,
      };
    });

    return {
      total: data.total,
      batch: adaptedCandidates
    };
  } catch (error) {
    console.error("Error al obtener los candidatos:", error);
    throw error;
  }
}