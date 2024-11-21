import { fetchAllInvoices } from "@/app/actions/fakeApi";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";

interface InvoiceDetails {
  id: number;
  cantidad: number;
  total: number;
  date: string;
  expiration: string;
  status: string;
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

  //const isInternal: boolean = true;

  const invoicesList = await fetchAllInvoices(page);

  const data: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Fecha", key: "date", width: 1.1 },
      { name: "Exipra", key: "expiration", width: 1.1 },
      { name: "Profesionales", key: "cantidad", width: 1 },
      { name: "Monto", key: "total", width: 1 },
      { name: "Estado", key: "status", width: 1 },
    ],
    total: 24,
    batch: invoicesList,
  };

  return (
    <div className="inner-page-container">
      <SearchBar buttonLink="/process/new-pro" buttonText="Nueva Factura" />
      <DataGrid data={data} baseUrl="/invoices" />
    </div>
  );
}
