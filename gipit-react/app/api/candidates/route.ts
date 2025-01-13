import { NextResponse } from 'next/server';
import { fetchCandidates } from "@/app/actions/fetchCandidates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || '';

  try {
    const response = await fetchCandidates({ page, query, status });
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error en la ruta de API:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener candidatos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 