"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";
import { usePathname } from "next/navigation";

function Page() {
  const actualRoute = usePathname();
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");

  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Descalificar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={handleDisqualify}
      message="¿Deseas Descartar al Candidato?"
    />
  );
}

export default Page;
