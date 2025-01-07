export const fetchAllPreInvoices = async (page: number) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices?page=${page}`;
  
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener las facturas');
    }
  
    const preInvoicesList = await response.json();
  
    if (!Array.isArray(preInvoicesList.batch)) {
      throw new Error('se esperaba un array en el batch');
    }
  
    console.log(preInvoicesList.batch);//SE IMPRIME EL BATCH
  
    return preInvoicesList.batch; 
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener las facturas: ${error.message || 'Error desconocido'}`);
    } else {
      throw new Error('Error desconocido al obtener las prefacturas');
    }
  }
};