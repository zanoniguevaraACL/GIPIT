export const fetchProcessDetails = async (processId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener detalles del proceso: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("DETALLE DEL PROCESO: ", data);

    return {
      id: data.processId, // Ajustar el nombre de la propiedad
      name: data.jobOffer, // Ajustar el nombre de la propiedad para que coincida con `name`
      stage: data.stage,
      startAt: data.openedAt ? new Date(data.openedAt).toLocaleDateString() : '',
      endAt: data.closedAt ? new Date(data.closedAt).toLocaleDateString() : null,
      preFiltered: data.preFiltered ? 1 : 0,
      status: data.status ?? '',
      candidates: data.candidates || [], // Asegúrate de que `candidates` sea un arreglo de objetos
      jobOfferDescription: data.jobOfferDescription ?? '',
      isInternal: data.isInternal ?? false,
    };
  } catch (error) {
    console.error("Error al obtener los detalles del proceso:", error);
    throw error;
  }
};