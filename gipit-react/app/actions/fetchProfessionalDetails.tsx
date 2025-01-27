// Función para formatear las fechas en formato DD/MM/YYYY
const formatDate = (dateString: string | null): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // Verificar si la fecha es válida
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes ajustado a 2 dígitos
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export const fetchProfessionalDetails = async (candidateId: string) => {
    try {
      // Validar que el id no esté vacío
      if (!candidateId || candidateId === '') {
        throw new Error('El id del candidato no está presente');
      }
  
      // URL de la API para obtener detalles del profesional (usando el candidateId)
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/candidate_pros_management/${candidateId}`;
    
      // Realizamos la solicitud GET a la API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
  
      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del profesional');
      }
    
      // Parsear la respuesta JSON
      const professionalDetails = await response.json();
      console.log(professionalDetails);
  
      // Si la respuesta está vacía o no tiene los detalles esperados
      if (!professionalDetails || Object.keys(professionalDetails).length === 0) {
        throw new Error('Detalles del profesional no encontrados');
      }
  
      // Aquí se está agregando la información de las evaluaciones
      const postSalesActivities = professionalDetails?.post_sales_activities || {};
  
      // Validar y formatear la fecha si está presente
      const formattedDate = formatDate(postSalesActivities?.date || null);
  
      // Extraer específicamente los valores de evaluación si están disponibles
      const evaluationData = {
        id: postSalesActivities?.id || null,
        date: formattedDate, // Fecha formateada
        eval_stack: postSalesActivities?.eval_stack || null,
        eval_comunicacion: postSalesActivities?.eval_comunicacion || null,
        eval_motivacion: postSalesActivities?.eval_motivacion || null,
        eval_cumplimiento: postSalesActivities?.eval_cumplimiento || null,
      };
  
      // Devuelvo los detalles del profesional junto con las evaluaciones
      return {
        ...professionalDetails,
        candidateName: professionalDetails?.candidates?.name || null, // Accedemos correctamente al nombre del candidato
        evaluationData, // Incluimos los datos de la evaluación con fecha formateada
      };
  
    } catch (error) {
      // Manejo de errores
      console.error("Error fetching professional details:", error);
      if (error instanceof Error) {
        throw new Error(`Error al obtener los detalles del profesional: ${error.message}`);
      } else {
        throw new Error('Error desconocido al obtener los detalles del profesional');
      }
    }
  };