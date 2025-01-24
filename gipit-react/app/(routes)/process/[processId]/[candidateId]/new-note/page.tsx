"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateNote } from "@/app/actions/handleCreateNote";
import { usePathname, useSearchParams } from "next/navigation";
import { createNoteSchema } from "@/app/lib/validationSchemas";

function Page() {
  const actualRoute = usePathname();
  const searchParams = useSearchParams();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");

  // candidateProcessId de los parámetros de la URL
  const candidateProcessId = searchParams.get("candidateProcessId");

  const fields: FormInputsRow = [
    {
      label: "Conocimientos técnicos",
      placeholder: "Inserte un valor numérico",
      type: "text",
      name: "techSkills",
    },
    {
      label: "Habilidades blandas",
      placeholder: "Inserte un valor numérico",
      type: "text",
      name: "softSkills",
    },
    {
      label: "Comentario",
      placeholder: "Inserte una nota",
      type: "textarea",
      name: "comment",
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  const onSubmit = async (formData: FormData): Promise<{ message: string; route: string; statusCode: number }> => {
    if (!candidateProcessId) {
      console.error("candidateProcessId no encontrado en la URL.");
      return {
        message: "candidateProcessId no encontrado en la URL.",
        route: actualRoute,
        statusCode: 400,
      };
    }

    // Retorna la respuesta de `handleCreateNote`
    return await handleCreateNote(formData, actualRoute, Number(candidateProcessId));
  };

  return <Modal rows={fields} onSubmit={onSubmit} title="Nueva Nota" validationSchema={createNoteSchema}/>;
}

export default Page;
