"use client";
import Button from "@/components/atoms/Button";
import "./processHeading.css";
import { useSession } from "next-auth/react";
import { useState } from "react";


function ProcessInternalHeading({
  process
}: {
  etapasToUse: {
    name: string;
    showCandidates: boolean;
    status: string;
  }[];
  process: {
    id: number;
    name: string;
    stage: string;
    startAt: string;
    endAt: string | null;
    preFiltered: number;
    candidates: unknown[];
    status: string;
  };
}) {
  const { data: session } = useSession();
  const userRole = session?.user.role as
  | "client"
  | "kam"
  | "gest"
  | "mkt"
  | "admin";

  const isProcessClosed = process.status.toLowerCase() === "cerrado";
  const [contracted] = useState(false);
  console.log("Proceso seleccionado --->", process)
  console.log("Estado del proceso seleccionad", process.status);



  return (
    <div className={`header-macro-container contracted`}>
      {/* Cabecera */}
      {}
      <div className="process-header">
        <div className="title-and-sub">
          <h3 className="regular">
            <b>{process.name}</b>
          </h3>
        </div>
        {/* Botones de accion oculto para los clientes */}
        { (!isProcessClosed && userRole !== 'client' )  ? (
        <div className="buttons-container">

        <Button
            text="Nuevo Candidato"
            type={"primary"}
            href={`/process/${process.id}/new-candidate`}
          />

          <Button
            text="Editar Proceso"
            type={"secondary"}
            href={`/process/${process.id}/view-offer`}
          />

          <Button
            text="Cerrar Proceso"
            type={"secondary"}
            href={`/process/${process.id}/close-process`}
          />

        </div>
        ): (

          <div className="buttons-container">
            <Button
              text="Revisar Vacante"
              type={contracted ? "secondary" : "tertiary"}
              href={`/process/${process.id}/view-offer`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProcessInternalHeading;
