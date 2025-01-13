//Alert al llamar esta ruta para cerrar el proceso


"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import { useState } from "react";
import { handleCloseProcess } from "@/app/actions/handleCloseProcess";

function CloseProcessPage({ params }: { params: { processId: string } }) {
  const actualRoute = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormInputsRow = [
    [
			{ 
        type: "cancel", 
        value: "Cancelar",
				href: `/process/${params.processId}`
      },
      { type: "submit", value: "Cerrar Proceso" },
    ],
  ];

	const handleSubmit = async (formData: FormData) => {
		setIsLoading(true); // Inicia el spinner
		formData.append("processId", params.processId);
		try{
			const result = await handleCloseProcess(formData, actualRoute);
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