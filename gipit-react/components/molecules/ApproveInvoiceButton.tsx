// components/ApproveInvoiceButton.tsx
'use client'

import React, { useState } from 'react';
import Button from "@/components/atoms/Button";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";

interface ApproveInvoiceButtonProps {
  invoiceId: string;
}

export default function ApproveInvoiceButton({ invoiceId }: ApproveInvoiceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      window.location.href = '/invoices';
    } catch (error) {
      console.error('Error al aprobar la factura:', error);
    }
  };

  return (
    <>
      <Button 
        text="Confirmar para pagar" 
        type="primary" 
        onClick={() => setIsModalOpen(true)}
      />
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => Promise.resolve(setIsModalOpen(false))} 
        onConfirm={async () => {
          await handleApproveInvoice();
          setIsModalOpen(false);
        }} 
        message="¿Estás seguro de que deseas confirmar el pago?"
      />
    </>
  );
}