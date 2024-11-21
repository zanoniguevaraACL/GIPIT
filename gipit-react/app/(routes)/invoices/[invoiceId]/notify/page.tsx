import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";

async function Page({ params }: { params: { invoiceId: string } }) {
  const { invoiceId } = params;
  const routeToRedirect = `/invoices/${invoiceId}`;

  const fields: FormInputsRow = [
    {
      label: "Descripción del error",
      name: "description",
      placeholder: "Describa el error en la factura",
      type: "textarea",
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Notificar" },
    ],
  ];

  return <Modal rows={fields} onSubmit={handleCreateCompany} />;
}

export default Page;
