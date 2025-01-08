"use client";
import Button from "@/components/atoms/Button";
import "./processHeading.css";

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

  return (
    <div className={`header-macro-container contracted`}>
      {/* Cabecera */}
      <div className="process-header">
        <div className="title-and-sub">
          <h3 className="regular">
            <b>{process.name}</b>
          </h3>
        </div>
        <div className="buttons-container">
          <Button
            text="Editar Proceso"
            type={"secondary"}
            href={`/process/${process.id}/view-offer`}
          />
          <Button
            text="Nuevo Candidato"
            type={"primary"}
            href={`/process/${process.id}/new-candidate`}
          />
        </div>
      </div>
    </div>
  );
}

export default ProcessInternalHeading;
