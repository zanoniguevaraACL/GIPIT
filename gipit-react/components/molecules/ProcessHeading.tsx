"use client";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import "./processHeading.css";


function ProcessHeading({
  process,
}: {
  process: {
    id: number;
    name: string;
    stage: string;
    startAt: string;
    endAt: string | null;
    preFiltered: number;
    status: string;
  };
}) {
  const [contracted] = useState(false);
  // setContracted(false);

  return (
    <div className={`header-macro-container ${contracted && "contracted"}`}>
      {/* Cabecera */}
      <div className="process-header">
        <div className="title-and-sub">
          <h3 className="regular">
            Estamos buscando un <b>{process.name}</b>
          </h3>
          <p className="text-14">{`Hemos procesado ${process.preFiltered} perfiles`}</p>
        </div>
        <div className="buttons-container">
          <Button
            text="Revisar Vacante"
            type={contracted ? "secondary" : "tertiary"}
            href={`/process/${process.id}/view-offer`}
          />
        </div>
      </div>
      {/* Detalles */}
      <div className="process-details-container">
        {/* Etapas */}
        {/* <div className="stages-macro-container">
          <p className="stages-title">Etapas</p>
          <div className="stages-row">
            {etapasToUse.map((et, index) => {
              return <Stage key={index} name={et.name} estado={et.status} />;
            })}
          </div>
        </div> */}
        {/* Descripción de la etapa */}
        {/* <div className="description-container">
          <div>
            <img src={description.image} alt="description conatiner" />
          </div>
          <div>
            <h3>{description.title}</h3>
            <p>{description.text}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ProcessHeading;
