// import { fetchCandidateDetails } from "@/app/actions/fakeApi";
import "./candidateDetails.css";
import CandidateClientNote from "../molecules/CandidateClientNote";
import Button from "../atoms/Button";
import { fetchCandidateDetails } from "@/app/actions/fetchCandidateDetails";

async function CandidateDetails({
  id,
  processId,
}: {
  id: number;
  processId: number;
}) {
  const data = await fetchCandidateDetails(id);
  const isInternal = true; // lo identificamos en la sesion, si el user es ACL mostramos el boton de editar candidato

  return (
    <div className="candidate-details-container">
      <h3>{data.name}</h3>
      <div className="experience-n-match-container">
        <p className="text-14">{data.totalExperience} años de experiencia</p>
        <div className="vertical-separator"></div>
        <p className="text-14">
          {data.match}% de compatibilidad <i>(calculado con IA)</i>
        </p>
      </div>
      <div className="details-block">
        <div dangerouslySetInnerHTML={{ __html: data.sumary }} className="text-content-display"></div>
        {/* <p className="text-14">{data.sumary}</p> */}
      </div>
      <div className="details-block">
        <h4>Habilidades Técnicas</h4>
        <p className="text-14">{data.techSkills}</p>
      </div>
      <div className="details-block">
        <h4>Habilidades Blandas</h4>
        <p className="text-14">{data.softSkills}</p>
      </div>
      {data.clientNote && (
        <CandidateClientNote note={data.clientNote} isInternal={isInternal} />
      )}
      <div className="buttons-container">
        <Button
          text="Descalificar"
          href={`/process/${processId}/${id}/disqualify`}
          type="secondary"
        />

        <div className="right-buttons-container">
          {!isInternal ? (
            <Button
              text={data.clientNote ? "Editar Nota" : "Crear Nota"}
              href={`/process/${processId}/${id}/${
                data.clientNote ? "edit-note" : "new-note"
              }`}
              type="secondary"
            />
          ) : (
            <Button
              text="Editar Candidato"
              href={`/process/${processId}/${id}/edit-candidate`}
              type="secondary"
            />
          )}
          <Button
            text="Contratar Candidato"
            href={`/process/${processId}/${id}/hire`}
            type="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
