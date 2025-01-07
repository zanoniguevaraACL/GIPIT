export const fetchCandidates = async (page: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/candidate_pros_management?page=${page}`;
    
      // Hacemos la solicitud GET a la API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
    
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al obtener los candidatos');
      }
    
      // Parseamos la respuesta como JSON
      const candidatesList = await response.json();
      console.log("Respuesta de la API:", candidatesList);
    
      // Comprobamos que la respuesta sea un array
      const batch = candidatesList || [];
    
      if (!Array.isArray(batch)) {
        console.error("Estructura inesperada en la respuesta de la API:", candidatesList);
        throw new Error('Se esperaba un array en la respuesta de los candidatos');
      }
    
      // Adaptamos la estructura de cada candidato según la nueva respuesta
      const adaptedCandidates = batch.map(candidate => {
        // Función para formatear las fechas en formato DD/MM/YYYY
        const formatDate = (dateString: string) => {
          if (!dateString) return null;
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes ajustado a 2 dígitos
          const day = String(date.getDate()).padStart(2, '0'); // Día ajustado a 2 dígitos
          return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
        };
  
        return {
          id: candidate.id,  // Ahora se usa el campo id en lugar de managementId
          name: candidate.name,
          role: candidate.role,
          client: candidate.client,
          start: formatDate(candidate.start), // Formatear fecha de inicio
          end: formatDate(candidate.end), // Formatear fecha de finalización
          rate: candidate.rate,
          status: candidate.status,
        };
        
      }
      
  
      
    );
    
      
      // Devolvemos la lista de candidatos adaptada
      return adaptedCandidates;
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los candidatos:", error);
      if (error instanceof Error) {
        throw new Error(`Error al obtener los candidatos: ${error.message || 'Error desconocido'}`);
      } else {
        throw new Error('Error desconocido al obtener los candidatos');
      }
    }
  };
  