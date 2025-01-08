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
        const response = await fetch(`http://localhost:3001/api/preinvoices/${invoiceId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          // Redirigir a la página de facturas
          setLoading(false);
          router.push('/invoices');
        } else {
          const errorData = await response.json();
          console.error('Error al eliminar la factura:', errorData.error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al eliminar la factura:', error);
        setLoading(false);
      }
    };

    deleteInvoice();
  }, [invoiceId, router]);

  return <div>{loading ? 'Eliminando factura, por favor espera...' : 'Factura eliminada.'}</div>;
}