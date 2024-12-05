import { fetchAllPreInvoices } from "@/app/actions/fetchInvoices";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";

interface InvoiceDetails {
  id: number;
  cantidad: number;
  total_value: number;
  estimated_date: string;
  expiration_date: string;
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
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

  const invoicesList = await fetchAllPreInvoices(page);
  

  const total = 24; 
  
  const data: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Fecha", key: "estimated_date", width: 1.1 },
      { name: "Exipra", key: "expiration_date", width: 1.1 },
      { name: "Profesionales", key: "cantidad", width: 1 },
      { name: "Monto", key: "total_value", width: 1 },
      { name: "Estado", key: "status", width: 1 },
    ],
    total, 
    batch: invoicesList, 
  };

  return (
    <div className="inner-page-container">
      <SearchBar buttonLink="/process/new-pro" buttonText="Nueva Factura" />
      <DataGrid data={data} baseUrl="/invoices" />
    </div>
  );
}
