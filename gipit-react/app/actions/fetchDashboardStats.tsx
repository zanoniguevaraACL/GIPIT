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
    const isClient = session?.user?.role === 'client';
    // Obtenemos el company_id a través del management del usuario
    const companyId = isClient ? session?.user?.managements?.[0]?.company?.id : null;

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`);
    if (isClient && companyId) {
      url.searchParams.append('companyId', companyId.toString());
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