'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCandidate } from "@/app/actions/handleCreateCandidate";
import Loader from "@/components/atoms/Loader";
import { candidateSchema } from "@/app/lib/validationSchemas";
import { useAppContext } from "../../../../../contexts/AppContext";



function Page({ params }: { params: { processId: string } }) {
	const { refreshCandidates } = useAppContext();
  const { processId } = params;
  const routeToRedirect = `/process/${processId}`;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

	// esta ruta es la del cancel
	// pero ademas de eso:
	// este componente cuando haga el submit va a redirigir a la pantalla parsing-doc (un loading...)
	// y cuando esté listo el parseo del cv va a enviar al edit-candidate para ver lo parseado y guardar

	const fields: FormInputsRow = [
		{
			label: "Nombre",
			placeholder: "Nombre del Profesional",
			type: "text",
			name: "name",
		},
		{
			label: "Teléfono",
			placeholder: "+56 000 00000",
			type: "text",
			name: "phone",
		},
		{
			label: "Correo electrónico",
			placeholder: "correo@server.com",
			type: "email",
			name: "email",
		},
		{
			label: "Dirección",
			placeholder: "# Calle, Ciudad, País",
			type: "text",
			name: "address",
		},
		{
			label: "CV",
			placeholder: "Subir CV",
			type: "file",
			name: "cv",
		},
		[
			{ type: "cancel", value: "Cancelar", href: routeToRedirect },
			{ type: "submit", value: "Crear Candidato" },
		],
	];

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await handleCreateCandidate(formData, routeToRedirect);
		if (result.statusCode === 200) {
			await refreshCandidates(Number(processId)); // Actualiza los datos
			router.push(result.route); // Redirige
		}
		setIsLoading(false);
    return result;
  };

  return (
    <div>
      {isLoading && <Loader />}
        <Modal 
          rows={fields} 
          onSubmit={handleSubmit} 
          title="Nuevo Candidato"
          validationSchema={candidateSchema}
        />
    </div>
  );
}

export default Page;