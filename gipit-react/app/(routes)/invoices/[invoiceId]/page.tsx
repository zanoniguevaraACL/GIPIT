import { fetchInvoiceDetails } from "@/app/actions/fetchInvoiceDetails";
import "../../pros/[proId]/proId.css";
import "./invoice.css";
import "@/components/molecules/candidateClientNote.css";
import Button from "@/components/atoms/Button";
import DataGrid from "@/components/molecules/DataGrid";
import { IconReceipt } from "@tabler/icons-react";
import ApproveInvoiceButton from "@/components/molecules/ApproveInvoiceButton";


interface InvoiceDetails {
  id: number;
  candidateName: string;
  date: string;
  rate: number;
  subtotal: number;
  vat: number;
  total: number;
}
interface Column<T> {
  name: string;
  key: keyof T;
  width: number;
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

export const dynamic = "force-dynamic";

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

  const dataGridData: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Nombre", key: "candidateName", width: 1.5 },
      { name: "Fecha", key: "date", width: 1 },
      { name: "UF por hora", key: "rate", width: 1 },
      { name: "Subtotal", key: "subtotal", width: 1 },
      { name: "VAT", key: "vat", width: 1 },
      { name: "Total", key: "total", width: 1 },
    ],
    total: preInvoice.pre_invoice_items ? preInvoice.pre_invoice_items.length : 0,
    batch: preInvoice.pre_invoice_items ? preInvoice.pre_invoice_items.map((item: { id: string; candidate_id: string; rate: string; total: string; subtotal: string; vat: string }) => {
      const candidate = candidates.find((c: { id: string; name: string }) => c.id === item.candidate_id);
      return {
        id: item.id,
        candidateName: candidate ? candidate.name : "Sin candidato",
        date: new Date(preInvoice.estimated_date).toLocaleDateString(),
        rate: parseFloat(item.rate),
        subtotal: parseFloat(item.subtotal),
        vat: parseFloat(item.vat),
        total: parseFloat(item.total),
      };
    }) : [],
  };

  const totalInvoice = preInvoice.pre_invoice_items 
    ? preInvoice.pre_invoice_items.reduce((acc: number, item: { total: string }) => acc + parseFloat(item.total), 0) 
    : 0;

  const handleApproveInvoice = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices/${invoiceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (!response.ok) {
        throw new Error('Error al aprobar la factura');
      }

      const result = await response.json();
      console.log(result.message);
      // Redirigir o actualizar el estado según sea necesario
      window.location.href = '/invoices';
    } catch (error) {
      console.error('Error al aprobar la factura:', error);
    }
  };

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
            <Button text="Rechazar Factura" href={`/invoices/${invoiceId}/delete`} type="primary" /> 
            <Button text="Modificar Factura" href={`/invoices/${invoiceId}/edit`} type="primary" />
            <Button text="Notificar un error" href={`/invoices/${invoiceId}/notify`} type="tertiary" />
          </div>
        </div>
        <div className="invoice-details-container">
          <h4>Detalle de la factura</h4>
        </div>
        <DataGrid 
          data={dataGridData} 
          baseUrl={`/invoices/${invoiceId}`}
          hasNoClick={true}
        />
        <div className="total-container">
          <h3>Total a pagar</h3>
          <h1>{totalInvoice.toFixed(2)} UF</h1>
          <div className="note-card">
            <h3>Nota</h3>
            <p>
              Este resumen es una proforma para validar el monto a facturar y los detalles de la facturación, al confirmarlos procederemos a enviar los documentos legales correspondientes.
            </p>
            <ApproveInvoiceButton invoiceId={invoiceId} />
          </div>
        </div>
      </div>
    </div>
  );
}


