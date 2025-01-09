import { fetchAllPreInvoices } from "@/app/actions/fetchInvoices";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";
import StatusButton from "@/components/molecules/StatusButton";

interface InvoiceDetails {
  id: number;
  professionals: string;
  period: string;
  total_value: number;
  date: string;
  status: string;
  estimated_date: string;
  expiration_date: string;
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
    status?: string;
    year?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const year = searchParams?.year || "";

  const invoices = await fetchAllPreInvoices(page, query, status, year);

  const data: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Profesionales", key: "professionals", width: 2 },
      { name: "Período", key: "period", width: 1.5 },
      { name: "Monto (UF)", key: "total_value", width: 1 },
      { name: "Fecha", key: "estimated_date", width: 1 },
      { name: "Estado", key: "status", width: 1 },
    ],
    total: invoices.total,
    batch: invoices.batch.map((invoice: InvoiceDetails) => ({
      ...invoice,
      period: `${new Date(invoice.estimated_date).toLocaleString('default', { month: 'long' })} - ${new Date(invoice.expiration_date).toLocaleString('default', { month: 'long' })}`,
      estimated_date: new Date(invoice.estimated_date).toISOString().split('T')[0],
      professionals: invoice.professionals,
      status: <StatusButton status={String(invoice.status)} />, // Aseguramos que sea string antes de pasar a StatusButton
    })),
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Todos los años" },
    { value: currentYear.toString(), label: "Año actual" },
    { value: (currentYear - 1).toString(), label: "Año pasado" }
  ];

  const statusOptions = [
    { value: "", label: "Todos los estados" },
    { value: "aprobado", label: "Aprobado" },
    { value: "pendiente", label: "Pendiente" },
    { value: "rechazado", label: "Rechazado" }
  ];

  return (
    <div className="inner-page-container">
      <SearchBar 
        buttonLink="/invoices/new-invoice" 
        buttonText="Nueva Factura" 
        statusOptions={statusOptions}
        defaultStatus=""
        yearOptions={yearOptions}
        defaultYear=""
      />
      <DataGrid 
        data={data} 
        baseUrl="/invoices"
      />
    </div>
  );
}