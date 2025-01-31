"use client";

import { useState } from "react";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";

export default function DeleteInvoicePage({ params }: { params: { invoiceId: string } }) {
  const { invoiceId } = params;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleDeleteInvoice = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices/${invoiceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reject' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        window.location.href = '/invoices';
      } else {
        const errorData = await response.json();
        console.error('Error al rechazar la factura:', errorData.error);
      }
    } catch (error) {
      console.error('Error al rechazar la factura:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    await handleDeleteInvoice();
    setIsModalOpen(false);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message="¿Estás seguro que deseas rechazar esta factura?"
      />
      {loading && <div>Rechazando factura, por favor espera...</div>}
    </>
  );
}