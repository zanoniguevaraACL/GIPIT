"use client";
import { useState, useEffect } from "react";
import ModalWithTextEditor from "@/components/molecules/ModalWithTextEditor";
import { FormInputsRow } from "@/app/lib/types";
import { handleEditCandidate } from "@/app/actions/handleEditCandidate";
import "@/components/molecules/textEditor.css";
import { fetchCandidateDetails } from "@/app/actions/fetchCandidateDetails";
import Loader from "@/components/atoms/Loader";
import { editCandidateSchema } from "../../../../../lib/validationSchemas";
import { useAppContext } from "../../../../../../contexts/AppContext";
import { useRouter } from "next/navigation";

type CandidateDetails = {
  name: string;
  match: number;
  email: string;
  phone: string;
  address: string;
  sumary: string;
  techSkills: string;
  softSkills: string;
  clientNote: {
    comment: string;
  };
  stage: string; // Nuevo campo para la etapa
};

export default function Page({
  params,
}: {
  params: { processId: string; candidateId: string };
}) {
  const { refreshCandidates } = useAppContext();

  const [candidateDetails, setCandidateDetails] =
    useState<CandidateDetails | null>(null);
  const { processId, candidateId } = params;
  const routeToRedirect = `/process/${processId}/${candidateId}`;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const searchParams = useSearchParams();

  // function handleSearch(term: string) {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchCandidateDetails(parseInt(candidateId));
        setCandidateDetails(details);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
  
    fetchDetails();
  }, [candidateId]);


  if (isLoading || !candidateDetails) {
    return <div><Loader/></div> 
  }

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
      defaultValue: candidateDetails.name,
    },
    {
      label: "Teléfono",
      placeholder: "+56 000 00000",
      type: "text",
      name: "phone",
      defaultValue: candidateDetails.phone,
    },
    {
      label: "Correo electrónico",
      placeholder: "correo@server.com",
      type: "email",
      name: "email",
      defaultValue: candidateDetails.email,
    },
    {
      label: "Dirección",
      placeholder: "# Calle, Ciudad, País",
      type: "text",
      name: "address",
      defaultValue: candidateDetails.address,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Cambios" },
    ],
  ];


  const handleSubmit = async (formData: FormData, actualRoute: string) => {
    setIsLoading(true);
    try {
      const result = await handleEditCandidate(formData, actualRoute); // Usa el segundo parámetro
      if (result.statusCode === 200) {
        await refreshCandidates(Number(processId), "entrevistas"); // Refresca la lista de candidatos
        router.push(result.route); // Redirige
      }
      return result; // Retorna el objeto con { message, route, statusCode }
    } catch (error) {
      console.error("Error al editar candidato:", error);
      return { message: "Error al editar candidato", route: actualRoute, statusCode: 500 };
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="main-container">
      <ModalWithTextEditor
        rows={fields}
        onSubmit={handleSubmit}
        title="Editar Candidato"
        cvCandidato={candidateDetails.sumary || "Escribe tu contenido aqui..."} // enviar contenido al modal
        validationSchema={editCandidateSchema} 
      />
    </div>
  );
}
