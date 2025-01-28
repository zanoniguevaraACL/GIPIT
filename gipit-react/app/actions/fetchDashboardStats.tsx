'use server';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";

interface DashboardStats {
  activosCount: number;
  cerradosCount: number;
  cerradosUltimoTrimestre: number;
  profesionalesCount: number;
  historicoTiempos: {
    labels: string[];
    values: number[];
  };
  cerradostrimestreCount: number;
  diasDesdeUltimoProcesoActivo: Date;
  promedioCierre: number;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    const isClient = session?.user?.role === 'client';
    const isClientManager = session?.user?.role === 'Cliente-Gerente';

    console.log('User Role:', session?.user?.role);
    console.log('Is Client:', isClient);
    console.log('Is Client Manager:', isClientManager);
    
    let companyId = null;
    let managementId = null;
    
    try {
      if (isClientManager) {
        // Para Cliente-Gerente, obtener la compañía de users_company
        const userCompaniesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/companies/${session?.user?.id}`
        );
        
        console.log('User Companies Fetch URL:', 
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/companies/${session?.user?.id}`
        );
        
        const userCompanies = await userCompaniesResponse.json();
        
        console.log('User Companies Response:', userCompanies);
        
        companyId = userCompanies[0]?.company_id; // Tomamos la primera compañía
        
        console.log('Company ID for Client Manager:', companyId);
      } else if (isClient) {
        // Para client, obtener la compañía de la jefatura
        managementId = session?.user?.managements?.[0]?.id;
        
        console.log('Management ID for Client:', managementId);
      }
    } catch (companyFetchError) {
      console.error('Error fetching company:', companyFetchError);
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`);
    if (isClientManager && companyId) {
      url.searchParams.append('companyId', companyId.toString());
    } else if (isClient && managementId) {
      url.searchParams.append('managementId', managementId.toString());
    }


    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Error al obtener las estadísticas del dashboard');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return {
      activosCount: 0,
      cerradosCount: 0,
      cerradosUltimoTrimestre: 0,
      profesionalesCount: 0,
      historicoTiempos: {
        labels: [],
        values: [],
      },
      cerradostrimestreCount: 0,
      diasDesdeUltimoProcesoActivo: new Date(),
      promedioCierre: 0
    };
  }
}