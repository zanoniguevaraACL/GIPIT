'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";

export const fetchInvoiceDetails = async (invoiceId: number) => {
  try {
    const session = await getServerSession(authOptions);
    const isClient = session?.user?.role === 'client';
    const companyId = session?.user?.role === 'client' ? 
      session?.user?.managements?.[0]?.company?.id : 
      null;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices/${invoiceId}`;
    const params = new URLSearchParams();
    if (isClient && companyId) {
      params.append('companyId', companyId.toString());
    }
    params.append('userRole', session?.user?.role || '');
    
    const apiUrl = session?.user?.role === 'client' && companyId ? 
      `${baseUrl}?companyId=${companyId}` : 
      baseUrl;

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
    console.error('Error en fetchInvoiceDetails:', error);
    throw error;
  }
};