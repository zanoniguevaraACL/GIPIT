'use server';

// Obtener todos los candidate_process para un proceso específico
export async function fetchAllCandidateProcesses(processId: number) {
  try {
    // Llamamos al endpoint pasando el process_id como parte de la URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidate_process/${processId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
			cache: 'no-store', // Evitar que se guarde en caché
    });

    if (!response.ok) {
      throw new Error(`Error fetching candidate processes: ${response.statusText}`);
    }

    const candidateProcesses = await response.json();
    return candidateProcesses;
  } catch (error) {
    console.error('Error fetching candidate processes:', error);
    return [];
  }
}

