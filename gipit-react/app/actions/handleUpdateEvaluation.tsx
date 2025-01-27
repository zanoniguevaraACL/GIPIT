export const handleUpdateEvaluation = async (evaluationId: string, data: unknown) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post_sales_activities/${evaluationId}`;
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
        const errorMessage = await response.text(); // Captura el mensaje de error
        throw new Error(`Error al actualizar la evaluación: ${errorMessage}`);
    }
  
    console.log("Datos a enviar:", data);
  
    console.log("Respuesta de onSubmit:", response);
  
    return await response.json(); // Asegúrate de que esto devuelva un objeto con 'route'
};
