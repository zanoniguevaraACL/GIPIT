"use client";
import Button from "@/components/atoms/Button";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import "./processHeading.css";
import Image from "next/image";

const Stage = ({ name, estado }: { name: string; estado: string }) => {
  return (
    <div className={`stage-container ${estado}`}>
      <h5>{name}</h5>
      <div className={`progress-bar`}></div>
    </div>
  );
};

function ProcessHeading({
  process,
  etapasToUse,
  description,
}: {
  etapasToUse: {
    name: string;
    showCandidates: boolean;
    status: string;
  }[];
  description: {
    title: string;
    image: string;
    text: string;
  };
  process: {
    id: number;
    name: string;
    stage: string;
    startAt: string;
    endAt: string | null;
    preFiltered: number;
    candidates: number;
    status: string;
    candidatesIds: number[];
  };
}) {
  const [contracted, setContracted] = useState(false);

  const expand = () => {
    setContracted(!contracted);
  };

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
        <div className="stages-macro-container">
          <p className="stages-title">Etapas</p>
          <div className="stages-row">
            {etapasToUse.map((et, index) => {
              return <Stage key={index} name={et.name} estado={et.status} />;
            })}
          </div>
        </div>
        {/* Descripción de la etapa */}
        <div className="description-container">
          <div>
            <Image src={description.image} alt="description conatiner" />
          </div>
          <div>
            <h3>{description.title}</h3>
            <p>{description.text}</p>
          </div>
        </div>
        {/* Boton de contraer - expandir */}
        <div className="description-expander-container">
          <p className="text-12 etapa-contracted">Etapa: {process.stage}</p>
          <div className="description-expander" onClick={expand}>
            {contracted ? (
              <>
                <p>Expandir</p>
                <IconChevronDown />
              </>
            ) : (
              <>
                <p>Contraer</p>
                <IconChevronUp />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessHeading;
