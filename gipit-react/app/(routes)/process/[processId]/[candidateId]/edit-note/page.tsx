'use client'

import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleEditNote } from "@/app/actions/handleEditNote";
import { fetchCandidateDetails } from "@/app/actions/fetchCandidateDetails";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/atoms/Loader";
import { editNoteSchema } from "@/app/lib/validationSchemas";

interface ClientNote {
  techSkills?: number;
  softSkills?: number;
  comment?: string;
}

function Page({ params }: { params: { processId: string; candidateId: string } }) {
  const { candidateId } = params; // `processId` no se utiliza, así que lo omitimos.
  const actualRoute = usePathname();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");
  const searchParams = useSearchParams();

  const [clientNote, setClientNote] = useState<ClientNote | null>(null);
  const [loading, setLoading] = useState(true);

  const candidateProcessId = searchParams.get("candidateProcessId");

  // Fetch de datos dentro de useEffect
  useEffect(() => {
    async function loadCandidateDetails() {
      try {
        if (!candidateId) return;
        const details = await fetchCandidateDetails(parseInt(candidateId));
        setClientNote(details.clientNote ?? {});
      } catch (error) {
        console.error("Error cargando los detalles del candidato:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCandidateDetails();
  }, [candidateId]);

  // Validación del parámetro candidateProcessId
  if (!candidateProcessId) {
    console.error("candidateProcessId no encontrado en la URL.");
    return <div>Error: No se encontró el candidateProcessId.</div>;
  }

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <Loader/>;
  }

  const fields: FormInputsRow = [
    {
      label: "Conocimientos técnicos",
      placeholder: "Inserte un valor numérico",
      type: "text",
      name: "techSkills",
      defaultValue: clientNote?.techSkills,
    },
    {
      label: "Habilidades blandas",
      placeholder: "Inserte un valor numérico",
      type: "text",
      name: "softSkills",
      defaultValue: clientNote?.softSkills,
    },
    {
      label: "Comentario",
      placeholder: "Inserte una nota",
      type: "textarea",
      name: "comment",
      defaultValue: clientNote?.comment,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  const onSubmit = async (formData: FormData): Promise<{ message: string; route: string; statusCode: number }> => {
    return await handleEditNote(formData, Number(candidateProcessId), routeToRedirect);
  };

  return <Modal rows={fields} onSubmit={onSubmit} title="Editar Nota" validationSchema={editNoteSchema} />;
}

export default Page;