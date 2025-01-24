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
    const isClientManager = session?.user?.role === 'Cliente-Gerente';

    let effectiveCompanyId = null;
    let managementId = null;
    
    console.log('Session:', session); 
    console.log('Role:', session?.user?.role);
    console.log('Is Client:', isClient);
    console.log('Company ID:', companyId);

    try {
      if (isClientManager) {
        // Para Cliente-Gerente, obtener la compañía de users_company
        const userCompaniesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/companies/${session?.user?.id}`
        );
        
        const userCompanies = await userCompaniesResponse.json();
        
        effectiveCompanyId = userCompanies[0]?.company_id;
      } else if (isClient) {
        // Para client, obtener el ID de su management
        managementId = session?.user?.managements?.[0]?.id;
      }
    } catch (companyFetchError) {
      console.error('Error fetching company:', companyFetchError);
    }
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);
    if (status) params.append('status', status);
    if (year) params.append('year', year);
    if (session?.user?.role) {
      params.append('userRole', session.user.role);
    }
    
    if (isClientManager && effectiveCompanyId) {
      params.append('companyId', effectiveCompanyId.toString());
    } else if (isClient && managementId) {
      params.append('managementId', managementId.toString());
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