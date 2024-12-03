export const fetchProcessDetails = async (processId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener detalles del proceso: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("DETALLE DEL PROCESO: ", data);
    return {
      ...data,
      candidates: data.candidates || [], // Asegúrate de que `candidates` sea un arreglo de objetos
    };
  } catch (error) {
    console.error("Error al obtener los detalles del proceso:", error);
    throw error;
  }
};