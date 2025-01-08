import { fetchCandidates } from "@/app/actions/fetchCandidates";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";
import Link from "next/link"; // Importa Link para la navegación

interface CandidateDetails {
  id: number; // El id será ahora el `managementId` de la API
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  role?: string;
  client?: string;
  start?: string;
  end?: string;
  rate?: string;
  status?: string;
}

interface Column<T> {
  name: string;
  key: keyof T;
  width: number;
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[]; // Definición de las columnas
  batch: T[]; // Los datos filtrados que se mostrarán
}

export default async function CandidatesPage(
  
  
  props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Obtención de los parámetros de búsqueda y paginación
  
  const searchParams = props.searchParams || {};
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.query?.toLowerCase() || "";

  // Llamar a la API para obtener la lista de candidatos
  const candidatesList: CandidateDetails[] = (await fetchCandidates(page)).map((candidate) => ({
    ...candidate,
    start: candidate.start ?? undefined, // Convierte null a undefined
    end: candidate.end ?? undefined, // Convierte null a undefined
  }));

  // Filtrar candidatos según el término de búsqueda
  const filteredCandidates = candidatesList.filter((candidate) =>
    candidate.name?.toLowerCase().includes(query)
  );

  // Configuración de columnas para la tabla
  const columns: Column<CandidateDetails>[] = [
    { name: "Nombre", key: "name", width: 1.5 },
    { name: "Rol", key: "role", width: 1.5 },
    { name: "Cliente", key: "client", width: 1.5 },
    { name: "Inicio", key: "start", width: 1.2 },
    { name: "Término", key: "end", width: 1.2 },
    { name: "Valor HH", key: "rate", width: 1.5 },
    { name: "Estado", key: "status", width: 1.2 },
  ];

  // Estructura de datos para la DataGrid
  const data: ResponseData<CandidateDetails> = {
    total: filteredCandidates.length,
    columns,
    batch: filteredCandidates,
  };

  // Mostrar un mensaje si no hay resultados
  if (filteredCandidates.length === 0) {
    return (
      <div className="inner-page-container">
        <div className="candidates-page-header">
          <SearchBar
            buttonLink="/candidates/new-candidate"
            buttonText="Nuevo Candidato"
          />
        </div>
        <p>No se encontraron candidatos que coincidan con los criterios de búsqueda.</p>
      </div>
    );
  }

  // Renderización del componente
  return (
    <div className="inner-page-container">
      <div className="candidates-page-header">
        <SearchBar
          buttonLink="/candidates/new-candidate"
          buttonText="Nuevo Candidato"
        />
      </div>

      {/* Tabla de datos de candidatos */}
      <div className="candidates-table">
        {/* Aquí pasamos los datos a DataGrid, y el baseUrl ahora es dinámico */}
        <DataGrid data={data} baseUrl="/pros" />
      </div>

      {/* Lista de candidatos con enlaces dinámicos */}
      <div className="candidate-list">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-item">
            <Link href={`/pros/${candidate.id}`}>
              <a>{candidate.name}</a> {/* Enlace al perfil del candidato */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
