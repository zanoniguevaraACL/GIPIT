"use client";
import Button from "@/components/atoms/Button";
import "./processHeading.css";
import { useState } from "react";

function ProcessInternalHeading({
  process,
  etapasToUse,
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
    candidates: number;
    status: string;
    candidatesIds: number[];
  };
}) {
  const [confirm, setConfirm] = useState({
    visible: false,
    data: { stage: process.stage, preFiltered: process.preFiltered },
  });

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
            text="Revisar Vacante"
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
      {/* Detalles */}
      <div className="process-details-container">
        <form onSubmit={() => alert(FormData)}>
          <label>
            Etapa
            <select
              onBlur={() => setConfirm({ ...confirm, visible: true })}
              onChange={(e) =>
                setConfirm({
                  ...confirm,
                  data: {
                    ...confirm.data,
                    stage: e.target.value,
                  },
                })
              }
              name="stage"
              defaultValue={process.stage.toLowerCase()}
            >
              {etapasToUse.map((et) => {
                return (
                  <option value={et.name.toLowerCase()} key={et.name}>
                    {et.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Candidatos pre filtrados
            <input
              defaultValue={process.preFiltered}
              type="number"
              name="preFiltered"
              onBlur={() => setConfirm({ ...confirm, visible: true })}
              onChange={(e) =>
                setConfirm({
                  ...confirm,
                  data: {
                    ...confirm.data,
                    preFiltered: parseInt(e.target.value),
                  },
                })
              }
            />
          </label>
          {confirm.visible && (
            <div className="overlay-layer">
              <div className="confirm-message">
                <h3>¿Deseas aplicar los cambios?</h3>
                <br></br>
                <p>
                  <b>Etapa: </b> {confirm.data.stage.toUpperCase()}
                </p>
                <p>
                  <b>Pre-Filtrados:</b> {confirm.data.preFiltered}
                </p>
                <br></br>
                <div className="flex-row gap-16">
                  <div
                    className="button secondary"
                    onClick={() => setConfirm({ ...confirm, visible: false })}
                  >
                    Cancelar
                  </div>
                  <input
                    type="submit"
                    value="Aplicar cambios"
                    className="button primary"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProcessInternalHeading;
