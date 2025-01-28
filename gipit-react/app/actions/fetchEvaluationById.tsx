// Asegúrate de importar las dependencias necesarias
import { Evaluation } from "@/app/lib/types"; // Asegúrate de que esta interfaz esté definida

export async function fetchEvaluationById(evaluationId: number): Promise<Evaluation> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/post_sales_activities/${evaluationId}`;
    console.log("Fetching evaluation from URL:", url); // Imprime la URL
    console.log("Fetching evaluation with ID:", evaluationId); // Imprime el ID
    console.log("Evaluación ID:", evaluationId); // Verifica que este valor no sea undefined

    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = await response.text(); // Obtén el mensaje de error del servidor
      throw new Error(`Error al obtener la evaluación: ${response.statusText} - ${errorMessage}`);
    }

    const data: Evaluation = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchEvaluationById:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}



