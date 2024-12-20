"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import { handleHire } from "@/app/actions/handleHire";

function Page({ params }: { params: { processId: string; candidateId: string } }) {
  const actualRoute = usePathname();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");

  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Contratar" },
    ],
  ];

    const handleSubmit = async (formData: FormData) => {
      formData.append("candidateId", params.candidateId);
      formData.append("processId", params.processId);
      const result = await handleHire(formData, actualRoute);
      if (result.statusCode === 200) {
        window.location.href = result.route;
      } else {
        console.error(result.message);
      }
      return result;
    };

  return (
    <Modal
      rows={fields}
      onSubmit={handleSubmit} // seleccionar la funcion correcta
      message="¿Deseas Contratar al Candidato?"
    />
  );
}

export default Page;
