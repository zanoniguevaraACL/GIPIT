'use server';

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

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