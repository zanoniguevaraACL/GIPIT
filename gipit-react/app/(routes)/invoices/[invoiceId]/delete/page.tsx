"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteInvoicePage({ params }: { params: { invoiceId: string } }) {
  const router = useRouter();
  const { invoiceId } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deleteInvoice = async () => {
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
          // Redirigir a la página de facturas
          setLoading(false);
          window.location.href = '/invoices';
        } else {
          const errorData = await response.json();
          console.error('Error al rechazar la factura:', errorData.error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al rechazar la factura:', error);
        setLoading(false);
      }
    };

    deleteInvoice();
  }, [invoiceId, router]);

  return <div>{loading ? 'Rechazando factura, por favor espera...' : 'Factura rechazada.'}</div>;
}