"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { usePathname } from "next/navigation";

function Page() {
  const actualRoute = usePathname();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");

  const fields: FormInputsRow = [
    {
      label: "Conocimientos técnicos",
      placeholder: "Inserte un valor numérico",
      type: "number",
      name: "techSkills",
    },
    {
      label: "Habilidades blandas",
      placeholder: "Inserte un valor numérico",
      type: "number",
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

  return <Modal rows={fields} onSubmit={handleDisqualify} title="Nueva Nota" />;
}

export default Page;
