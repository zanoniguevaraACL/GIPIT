import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const fetchInvoiceDetails = async (invoiceId: number) => {
  try {
    const session = await getServerSession(authOptions);
    const companyId = session?.user?.managements?.[0]?.company?.id;

    if (!companyId) {
      throw new Error('No se encontró ID de compañía');
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices/${invoiceId}?companyId=${companyId}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Error al obtener los detalles de la factura');
    }

    const { preInvoice, candidates } = await response.json();

    return { preInvoice, candidates }; 
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener los detalles de la factura: ${error.message || 'Error desconocido'}`);
    } else {
      throw new Error('Error desconocido al obtener los detalles de la factura');
    }
  }
}; 