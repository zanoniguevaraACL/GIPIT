"use client";

import { fetchCandidates } from "@/app/actions/fetchCandidates";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";
import StatusButton from "@/components/molecules/StatusButton";
import "./pros.css";

interface CandidateDetails {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  role?: string;
  client?: string;
  start?: string;
  end?: string;
  rate?: string;
  status?: string | React.ReactNode;
}

interface Column<T> {
  name: string;
  key: keyof T;
  width: number;
  render?: (value: T[keyof T]) => React.ReactNode; // Aquí está el cambio principal
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "activo", label: "Activo" },
  { value: "desvinculado", label: "Desvinculado" },
];

export default async function CandidatesPage(
  props: {
    searchParams?: {
      query?: string;
      page?: string;
      status?: string;
    };
  }
) {
  const searchParams = props.searchParams || {};
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.query?.toLowerCase() || "";
  const status = searchParams.status || "";

  const response = await fetchCandidates({ page, query, status });
  if (!response || !response.batch) {
    console.error("Respuesta inválida de fetchCandidates:", response);
    return (
      <SearchBar />
    );
  }

  const candidatesList = response.batch.map((candidate: CandidateDetails) => ({
    ...candidate,
    start: candidate.start ?? undefined,
    end: candidate.end ?? undefined,
    status: <StatusButton status={String(candidate.status)} />,
  }));

  const filteredCandidates = candidatesList.filter((candidate: CandidateDetails) =>
    candidate.name?.toLowerCase().includes(query)
  );

  const columns: Column<CandidateDetails>[] = [
    { name: "Nombre", key: "name", width: 1.5 },
    { name: "Rol", key: "role", width: 1.5 },
    { name: "Cliente", key: "client", width: 1.5 },
    { name: "Inicio", key: "start", width: 1.2 },
    { name: "Término", key: "end", width: 1.2 },
    { name: "Valor HH", key: "rate", width: 1.5 },
    { 
      name: "Estado", 
      key: "status", 
      width: 1.2,
      render: (value: string | React.ReactNode) => {
        if (typeof value === 'string') {
          return <StatusButton status={value} />;
        }
        return value;
      }
    },
  ];

  const data: ResponseData<CandidateDetails> = {
    total: response.total,
    columns,
    batch: candidatesList,
  };

  if (filteredCandidates.length === 0) {
    return (
      <div className="inner-page-container">
        <div className="candidates-page-header">
          <SearchBar
            statusOptions={statusOptions}
          />
        </div>
        <p>No se encontraron candidatos que coincidan con los criterios de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="inner-page-container">
      <div className="candidates-page-header">
        <SearchBar
          statusOptions={statusOptions}
        />
      </div>
      <div className="candidates-table-container">
        <div className="candidates-table">
          <DataGrid data={data} baseUrl="/pros" />
        </div>
      </div>
    </div>
  );
}