import { fetchAllPreInvoices } from "@/app/actions/fetchInvoices";
import DataGrid from "@/components/molecules/DataGrid";
import SearchBar from "@/components/molecules/SearchBar";

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
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const query = searchParams?.query || "";

  const invoicesList = await fetchAllPreInvoices(page);
  const data: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Profesionales", key: "professionals", width: 2 },
      { name: "Período", key: "period", width: 1.5 },
      { name: "Monto (UF)", key: "total_value", width: 1 },
      { name: "Fecha", key: "expiration_date", width: 1 },
      { name: "Estado", key: "status", width: 1 },
    ],
    total: invoicesList.length,
    batch: invoicesList.map((invoice: InvoiceDetails) => {
      const estimatedDate = new Date(invoice.estimated_date);
      const expirationDate = new Date(invoice.expiration_date);
      
      const period = `${estimatedDate.toLocaleString('default', { month: 'long' })} - ${expirationDate.toLocaleString('default', { month: 'long' })}`;

      const candidates = invoice.professionals.split(',').map(professional => professional.trim());
      const professionals = candidates.slice(0, 3);
      const additionalCount = candidates.length - 3;

      const professionalsDisplay = additionalCount > 0 
        ? `${professionals.join(', ')} y otros ${additionalCount}` 
        : professionals.join(', ');

      return {
        ...invoice,
        period, // Agregar el nuevo campo period
        expiration_date: expirationDate.toISOString().split('T')[0], // Extraer solo el año, mes y día
        professionals: professionalsDisplay,
      };
    }),
  };

  return (
    <div className="inner-page-container">
      <SearchBar buttonLink="/invoices/new-invoice" buttonText="Nueva Factura" />
      <DataGrid 
        data={data} 
        baseUrl="/invoices"
      />
    </div>
  );
}