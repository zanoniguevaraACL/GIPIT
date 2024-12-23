import { fetchAllPreInvoices } from "@/app/actions/fetchInvoices";
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
  candidateName: string;
  date: string;
  rate: string;
  subtotal: string;
  pre_invoice_items: Array<{
    id: number;
    service: string;
    rate: string;
    hours: string;
    subtotal: string;
    vat: string;
    total: string;
    description: string;
    candidates: Array<{ name: string }>;
  }>;
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

export default async function Page(props: {
  params: {
    invoiceId: string;
  };
}) {
  const { invoiceId } = props.params;
  const invoicesList = await fetchAllPreInvoices(1);
  const invoiceDetails = invoicesList.find((invoice: InvoiceDetails) => invoice.id === parseInt(invoiceId));

  if (!invoiceDetails) {
    return <div>No se encontró la factura.</div>;
  }
//SE CREA EL DATA GRID
  const dataGridData: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Nombre", key: "candidateName", width: 1.5 },
      { name: "Fecha", key: "date", width: 1 },
      { name: "UF por hora", key: "rate", width: 1 },
      { name: "Subtotal", key: "subtotal", width: 1 },
    ],
    total: invoiceDetails.pre_invoice_items ? invoiceDetails.pre_invoice_items.length : 0,
    batch: invoiceDetails.pre_invoice_items ? invoiceDetails.pre_invoice_items.map((item) => ({
      id: item.id,
      candidateName: item.candidates.length > 0 ? item.candidates[0].name : "Sin candidato",
      date: new Date(invoiceDetails.estimated_date).toLocaleDateString(),
      rate: parseFloat(item.rate),
      subtotal: parseFloat(item.subtotal),
    })) : [],
  };


  //SE LLAMA A LA API PARA OBTENER EL TOTAL DE LA FACTURA
  const totalInvoice = invoiceDetails.pre_invoice_items ? invoiceDetails.pre_invoice_items.reduce((acc: number, item: { total: string }) => acc + parseFloat(item.total), 0) : 0;


  //SE OBTIENE EL NOMBRE DE LOS CANDIDATOS
  const candidates = invoiceDetails.pre_invoice_items.flatMap(item => item.candidates || []);
  const professionalsDisplay = candidates.length > 0 
    ? candidates.map(candidate => candidate.name).join(', ') 
    : 'Sin candidatos';

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
              Emitido el {new Date(invoiceDetails.estimated_date).toLocaleDateString()} - Válido hasta {new Date(invoiceDetails.expiration_date).toLocaleDateString()}
            </p>
          </div>
          <div className="pro-buttons-container">
            <Button
              text="Eliminar Factura"
              href={`/invoices/${invoiceId}/delete`}
              type="primary"
            />
            <Button
              text="Notificar un error"
              href={`/invoices/${invoiceId}/notify`}
              type="tertiary"
            />
          </div>
        </div>
        <p className="section-title text-14">Detalles de la factura</p>
        <p>Profesionales: {professionalsDisplay}</p>
        <DataGrid
          data={dataGridData}
          baseUrl={`/pros/${invoiceId}`}
          hasNoClick={true}
          hasNoPagination={true}
        />
        <div className="total-container">
          <h3>Total a pagar</h3>
          <h1>{totalInvoice.toFixed(2)} UF</h1>
        </div>
        <div className="client-note-container">
          <div className="note-header">
            <h4>Nota</h4>
          </div>
          <p className="text-14">
            Este resumen es una instancia para validar el monto a facturar y los detalles de la facturación, al confirmarlos procederemos a enviar los documentos legales correspondientes.
          </p>
          <div className="button-note-container">
            <Button
              text="Confirmar y recibir factura"
              href={`/invoices/${invoiceId}/confirm`}
              type="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
