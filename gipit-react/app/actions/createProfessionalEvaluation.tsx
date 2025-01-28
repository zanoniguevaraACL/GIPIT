'use server'

export async function updateProfessionalEvaluation(proId: string, evaluationData: {
  eval_stack: number;
  eval_comunicacion: number;
  eval_motivacion: number;
  eval_cumplimiento: number;
  date: string;
  benefit: string;
  client_comment: string;
  acciones_acl: string;
  proyecction: string;
  candidate_management_id: number;
}) {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('La URL de la API no está configurada');
    }

    const isoDate = new Date(evaluationData.date).toISOString();
    
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post_sales_activities`;
    
    const completeData = {
      ...evaluationData,
      date: isoDate,
      candidate_management_id: evaluationData.candidate_management_id,
      benefit: evaluationData.benefit || null,
      client_comment: evaluationData.client_comment || null,
      acciones_acl: evaluationData.acciones_acl || null,
      proyecction: evaluationData.proyecction || null,
      eval_stack: parseFloat(evaluationData.eval_stack.toFixed(2)),
      eval_comunicacion: parseFloat(evaluationData.eval_comunicacion.toFixed(2)),
      eval_motivacion: parseFloat(evaluationData.eval_motivacion.toFixed(2)),
      eval_cumplimiento: parseFloat(evaluationData.eval_cumplimiento.toFixed(2)),
    };

    console.log('Datos completos a enviar:', completeData);
    console.log('Verificando candidate_management_id en completeData:', completeData.candidate_management_id);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(completeData),
      cache: 'no-store',
    });

    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al actualizar la evaluación: ${errorText}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;

  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
}