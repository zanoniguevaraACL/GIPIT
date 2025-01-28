"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { usePathname } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import { useState } from "react";

function Page({ params }: { params: { processId: string; candidateId: string } }) {
  const actualRoute = usePathname();
  //quiero que me rediriga al listado de candidatos que estaba
  const routeToRedirect = `/process/${params.processId}`;
  const [isLoading, setIsLoading] = useState(false); // Estado de carga



  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Descartar" },
    ],
  ];

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true); // Inicia el spinner
    formData.append("candidateId", params.candidateId);
    formData.append("processId", params.processId);
    try{
      const result = await handleDisqualify(formData, actualRoute);
      if (result.statusCode === 200) {
        window.location.href = result.route;
      } else {
        console.error(result.message);
      }
      return result;
    } finally {
      setIsLoading(false); // Detén el spinner
    }
  };

  return (
    <>
    {isLoading && <Loader/>}
    <Modal
      rows={fields}
      onSubmit={handleSubmit} // seleccionar la funcion correcta
      message="¿Deseas Descartar al Candidato?"
    />
    </>
  );
}

export default Page;
