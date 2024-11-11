import { fetchCandidateDetails } from "@/app/actions/fakeApi";
import "./candidateDetails.css";
import CandidateClientNote from "../molecules/CandidateClientNote";
import Button from "../atoms/Button";

async function CandidateDetails({ id }: { id: number }) {
  const data = await fetchCandidateDetails(id);

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
        <h4>Resumen</h4>
        <p className="text-14">{data.sumary}</p>
      </div>
      <div className="details-block">
        <h4>Habilidades Técnicas</h4>
        <p className="text-14">{data.techSkills}</p>
      </div>
      <div className="details-block">
        <h4>Habilidades Blandas</h4>
        <p className="text-14">{data.softSkills}</p>
      </div>
      {data.clientNote && <CandidateClientNote note={data.clientNote} />}
      <div className="buttons-container">
        <Button text="Descalificar" href="/" type="secondary" />

        <div className="right-buttons-container">
          <Button
            text={data.clientNote ? "Editar Nota" : "Crear Nota"}
            href="/"
            type="secondary"
          />
          <Button text="Contratar Candidato" href="/" type="primary" />
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
