import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";

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
    const session = await getServerSession(authOptions);
    console.log('Session data:', {
      role: session?.user?.role,
      managements: session?.user?.managements
    });
    const isClient = session?.user?.role === 'client';
    // Solo aplicamos el filtro de compañía si el usuario es cliente
    const companyId = session?.user?.role === 'client' ? 
      session?.user?.managements?.[0]?.company?.id : 
      null;
    
    console.log('Session:', session); 
    console.log('Role:', session?.user?.role);
    console.log('Is Client:', isClient);
    console.log('Company ID:', companyId);
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);
    if (status) params.append('status', status);
    if (year) params.append('year', year);
    if (session?.user?.role) {
      params.append('userRole', session.user.role);
    }
    
    if (session?.user?.role === 'client' && session?.user?.managements?.[0]?.company?.id) {
      params.append('companyId', session.user.managements[0].company.id.toString());
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices?${params.toString()}`;
    console.log('API URL:', apiUrl);
  
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

    console.log('Respuesta del servidor:', preInvoicesList);
  
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