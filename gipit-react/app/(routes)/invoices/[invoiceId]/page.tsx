import { fetchInvoiceDetails } from "@/app/actions/fetchInvoiceDetails";
import "../../pros/[proId]/proId.css";
import "./invoice.css";
import "@/components/molecules/candidateClientNote.css";
import Button from "@/components/atoms/Button";
import DataGrid from "@/components/molecules/DataGrid";
import { IconReceipt } from "@tabler/icons-react";

interface InvoiceDetails {
  id: number;
  estimated_date: string;
  expiration_date: string;
  total_value: string;
  description: string;
  status: string;
  pre_invoice_items: Array<{
    id: number;
    service: string;
    rate: string;
    hours: string;
    subtotal: string;
    vat: string;
    total: string;
    candidates: Array<{ id: number; name: string }>;
  }>;
}

export default async function Page(props: {
  params: {
    invoiceId: string;
  };
}) {
  const { invoiceId } = props.params;
  const { preInvoice, candidates } = await fetchInvoiceDetails(parseInt(invoiceId));

  if (!preInvoice) {
    return <div>No se encontró la factura.</div>;
  }

  const dataGridData = {
    columns: [
      { name: "Nombre", key: "candidateName" as "candidateName", width: 1.5 },
      { name: "Fecha", key: "date" as "date", width: 1 },
      { name: "UF por hora", key: "rate" as "rate", width: 1 },
      { name: "total", key: "total" as "total", width: 1 },
    ],
    total: preInvoice.pre_invoice_items ? preInvoice.pre_invoice_items.length : 0,
    batch: preInvoice.pre_invoice_items ? preInvoice.pre_invoice_items.map((item: any) => {
      const candidate = candidates.find((c: any) => c.id === item.candidate_id);
      return {
        id: item.id,
        candidateName: candidate ? candidate.name : "Sin candidato",
        date: new Date(preInvoice.estimated_date).toLocaleDateString(),
        rate: parseFloat(item.rate),
        total: parseFloat(item.total),
      };
    }) : [],
  };

  const totalInvoice = preInvoice.pre_invoice_items 
    ? preInvoice.pre_invoice_items.reduce((acc: number, item: { total: string }) => acc + parseFloat(item.total), 0) 
    : 0;

  return (
    <div className="max-container">
      <div className="pro-details-container">
        <div className="pro-header">
          <div className="pro-avatar">
            <IconReceipt />
          </div>
          <div>
            <h4>Pre Factura</h4>
            <p className="text-12 position">
              Emitido el {new Date(preInvoice.estimated_date).toLocaleDateString()} - Válido hasta {new Date(preInvoice.expiration_date).toLocaleDateString()}
            </p>
          </div>
          <div className="pro-buttons-container">
            <Button text="Eliminar Factura" href={`/invoices/${invoiceId}/delete`} type="primary" />
            <Button text="Notificar un error" href={`/invoices/${invoiceId}/notify`} type="tertiary" />
          </div>
        </div>
        <DataGrid data={dataGridData} />
        <div className="total-container">
          <h3>Total a pagar</h3>
          <h1>{totalInvoice.toFixed(2)} UF</h1>
        </div>
      </div>
    </div>
  );
}
