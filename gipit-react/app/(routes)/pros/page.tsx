import { fetchProfessionals } from "@/app/actions/fakeApi";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";

interface Professional {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  cv?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string | null;
  hourValue?: number;
  status?: string;
}

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
  }>;
}) {
  const searchParams = await props.searchParams;
  //const query = searchParams?.query || "";
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

  const isInternal: boolean = true;

  const prosList = await fetchProfessionals(page);
  let data: ResponseData<Professional>;

  if (isInternal) {
    data = {
      columns: [
        { name: "Nombre", key: "name", width: 1.1 },
        { name: "Rol", key: "position", width: 1.1 },
        { name: "Cliente", key: "company", width: 1 },
        { name: "Inicio", key: "startDate", width: 0.7 },
        { name: "Término", key: "endDate", width: 0.7 },
        { name: "Valor HH", key: "hourValue", width: 0.5 },
        { name: "Estado", key: "status", width: 0.7 },
      ],
      total: prosList.total,
      batch: prosList.batch,
    };
  } else {
    data = {
      columns: [
        { name: "Nombre", key: "name", width: 1.1 },
        { name: "Rol", key: "position", width: 1.1 },
        //{ name: "Cliente", key: "company", width: 1 },
        { name: "Inicio", key: "startDate", width: 0.7 },
        { name: "Término", key: "endDate", width: 0.7 },
        { name: "Valor HH", key: "hourValue", width: 0.5 },
        { name: "Estado", key: "status", width: 0.7 },
      ],
      total: prosList.total,
      batch: prosList.batch,
    };
  }

  return (
    <div className="inner-page-container">
      <SearchBar buttonLink="/process/new-pro" buttonText="Nuevo Profesional" />
      <DataGrid data={data} baseUrl="/pros" />
    </div>
  );
}
