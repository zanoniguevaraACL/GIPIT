//Alert al llamar esta ruta para cerrar el proceso


"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import { useState } from "react";

function CloseProcessPage({ params }: { params: { processId: string } }) {
  const actualRoute = usePathname();
	const routeToRedirect = `/process/${params.processId}`;
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: actualRoute },
      { type: "submit", value: "Cerrar Proceso" },
    ],
  ];

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    formData.append("processId", params.processId);

    try {
			alert("Proceso cerrado");
			return { 
				statusCode: 200, 
				route: '/process',
				message: "Proceso cerrado"
			}
		}
		finally {
			setIsLoading(false);
			return {
				statusCode: 500,
				route: routeToRedirect,
				message: "Error al cerrar el proceso"
			}
		}
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        rows={fields}
        onSubmit={handleSubmit}
        message="¿Estás seguro de que deseas cerrar este proceso?"
      />
    </>
  );
}

export default CloseProcessPage;