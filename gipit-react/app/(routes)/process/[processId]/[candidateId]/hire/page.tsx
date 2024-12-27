"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import { handleHire } from "@/app/actions/handleHire";
import { useState } from "react";
import Loader from "@/components/atoms/Loader";

function Page({ params }: { params: { processId: string; candidateId: string } }) {
  const actualRoute = usePathname();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Contratar" },
    ],
  ];

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true); // Inicia el spinner
    formData.append("candidateId", params.candidateId);
    formData.append("processId", params.processId);
    try {
      const result = await handleHire(formData, actualRoute);
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
      message="¿Deseas Contratar al Candidato?"
    />
    </>
  );
}

export default Page;
