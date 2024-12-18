'use server';

interface DashboardStats {
  activosCount: number;
  cerradosCount: number;
  cerradosUltimoTrimestre: number;
  profesionalesCount: number;
  tiempoCierre: number;
  historicoTiempos: {
    labels: string[];
    values: number[];
  };
  cerradostrimestreCount:number;
  diasDesdeUltimoProcesoActivo:Date;
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
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener las estadísticas del dashboard');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    // Valores por defecto en caso de error
    return {
      activosCount: 0,
      cerradosCount: 0,
      cerradosUltimoTrimestre: 0,
      profesionalesCount: 0,
      tiempoCierre: 0,
      historicoTiempos: {
        labels: [],
        values: [],
      },
      cerradostrimestreCount: 0,
      diasDesdeUltimoProcesoActivo: new Date(),
    };
  }
} 