import { fetchInvoiceDetails } from "@/app/actions/fakeApi";
import "../../pros/[proId]/proId.css";
import "./invoice.css";
import "@/components/molecules/candidateClientNote.css";
import Button from "@/components/atoms/Button";
import DataGrid from "@/components/molecules/DataGrid";
import { IconReceipt } from "@tabler/icons-react";

interface InvoiceDetails {
  id: number;
  name: string;
  service: string;
  rate: number;
  hours: number;
  subtotal: number;
  vat: number;
  total: number;
  description: string;
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
  params: {
    invoiceId: string;
  };
}) {
  const { invoiceId } = props.params;

  const invoiceDetails = await fetchInvoiceDetails(parseInt(invoiceId));

  const dataGridData: ResponseData<InvoiceDetails> = {
    columns: [
      { name: "Nombre", key: "name", width: 1.3 },
      { name: "Rol", key: "service", width: 1.5 },
      { name: "Valor HH", key: "rate", width: 1 },
      { name: "Horas trabajadas", key: "hours", width: 1 },
      { name: "Vat", key: "vat", width: 1 },
      { name: "Total", key: "total", width: 1 },
    ],
    total: 12,
    batch: invoiceDetails.details,
  };

  return (
    <div className="max-container">
      <div className="pro-details-container">
        {/* Header */}
        <div className="pro-header">
          <div className="pro-avatar">
            <IconReceipt />
          </div>
          <div>
            <div className="flex-row gap-12 name-n-mail-container">
              <h4>Pre Factura</h4>
            </div>
            <p className="text-12 position">
              Emitido el 8/02/2025 - Válido hasta el 12/02/2025
            </p>
          </div>
          <div className="pro-buttons-container">
            <Button
              text="Notificar un error"
              href={`/invoices/${invoiceId}/notify`}
              type="tertiary"
            />
          </div>
        </div>
        <br></br>
        {/* Detalle de la factura */}
        <p className="section-title text-14">Detalles de la factura</p>
        <DataGrid
          data={dataGridData}
          baseUrl={`/pros/${invoiceId}`}
          hasNoClick={true}
          hasNoPagination={true}
        />
        {/* Total */}
        <div className="total-container">
          <h3>Total a pagar</h3>
          <h1>{invoiceDetails.total}</h1>
        </div>
        {/* boton de comprobar */}
        <div className="client-note-container">
          <div className="note-header">
            <h4>Nota</h4>
          </div>
          <p className="text-14">
            Este resumen es una instancia para validar el monto a facturar y los
            detalles de la facturación, al confirmarlos procederemos a enviar
            los documentos legales correspondientes.
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
