
export const fetchProcessDetails = async (processId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener detalles del proceso: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los detalles del proceso:", error);
    throw error;
  }
};