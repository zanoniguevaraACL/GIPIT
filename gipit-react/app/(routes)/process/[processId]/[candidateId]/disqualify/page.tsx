"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { usePathname } from "next/navigation";

function Page({ params }: { params: { processId: string; candidateId: string } }) {
  const actualRoute = usePathname();
  //quiero que me rediriga al listado de candidatos que estaba
  const routeToRedirect = `/process/${params.processId}`;



  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Descalificar" },
    ],
  ];

  const handleSubmit = async (formData: FormData) => {
    formData.append("candidateId", params.candidateId);
    formData.append("processId", params.processId);
    const result = await handleDisqualify(formData, actualRoute);
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
      onSubmit={handleSubmit}
      message="¿Deseas Descartar al Candidato?"
    />
  );
}

export default Page;
