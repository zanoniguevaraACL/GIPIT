interface PreInvoice {
  id: number;
  estimated_date: string;
  expiration_date: string;
  total_value: number;
  description: string;
  status: string;
  professionals: string;
  pre_invoice_items: {
    candidates: {
      id: number;
      name: string;
    }[];
  }[];
}

export const fetchAllPreInvoices = async (page: number, query?: string, status?: string, year?: string) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);
    if (status) params.append('status', status);
    if (year) params.append('year', year);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices?${params.toString()}`;
  
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

    if (year) {
      preInvoicesList.batch = preInvoicesList.batch.filter((invoice: PreInvoice) => {
        const invoiceYear = new Date(invoice.estimated_date).getFullYear().toString();
        return invoiceYear === year;
      });
    }
  
    return {
      total: preInvoicesList.total,
      batch: preInvoicesList.batch
    }; 
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener las facturas: ${error.message || 'Error desconocido'}`);
    } else {
      throw new Error('Error desconocido al obtener las prefacturas');
    }
  }
};