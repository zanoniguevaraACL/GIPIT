import { fetchProcess } from "@/app/actions/fetchProcess";
import DataGrid from "@/components/molecules/DataGrid";
import EmptyState from "@/components/molecules/EmptyState";
import SearchBar from "@/components/molecules/SearchBar";
import { IconUserSearch } from "@tabler/icons-react";

type Proceso = {
  id: number;
  name: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  status: string;
  candidatesIds: number[];
  jobOffer: string | null;
  stage: string;
  company: string;
  isInternal: boolean;
};

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string
    companyId?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const query = searchParams?.query || ""; // Obtener el filtro de búsqueda
  const status = searchParams?.status || "";
  const companyId = searchParams?.companyId || "";
  // const company = searchParams?.company || "";
  const process = await fetchProcess(page, query, status, Number(companyId));

  const data: ResponseData<Proceso> = {
    columns: [
      { name: "Nombre", key: "name", width: 2 },
      { name: "Etapa", key: "stage", width: 1.2 },
      { name: "Inicio", key: "startAt", width: 1 },
      { name: "Cierre", key: "endAt", width: 1 },
      { name: "Pre Filtrados", key: "preFiltered", width: 1 },
      { name: "Candidatos", key: "candidates", width: 1 },
      { name: "Compañia", key: "company", width: 0.9 },
      { name: "Estado", key: "status", width: 0.6 },
    ],
    total: process.total,
    batch: process.batch,
  };

  const statusOptions = [
    { value: "", label: "Todos los estados" },
    { value: "activo", label: "Activo" },
    { value: "pending", label: "Pendiente" },
    { value: "cerrado", label: "Cerrado" }
  ];


  return (
    <div className="inner-page-container">
      <SearchBar 
        buttonLink="/process/new-process" 
        buttonText="Nuevo Proceso" 
        statusOptions={statusOptions}
        companyFilter={true}
      />
      {process.total === 0 ? ( 
          <EmptyState
          icon={< IconUserSearch/>}
          title="No se encontraron procesos para mostrar"
          subheading="Podrás ver los procesos, cuando estén disponibles"
        />
      ) : (
        <DataGrid data={data} baseUrl="/process" />
      )}

    </div>
  );
}
