import { IconBulb } from "@tabler/icons-react";
import "./candidateClientNote.css";

function CandidateClientNote({
  note,
  isInternal,
}: {
  note: { techSkills?: number; softSkills?: number; comment: string };
  isInternal: boolean;
}) {
  return (
    <div className="client-note-container">
      <div className="note-header">
        {!isInternal ? <h4>Tus Apuntes</h4> : <h4>Apuntes del cliente</h4>}
        <IconBulb />
      </div>
      <p className="text-14">Conocimientos técnicos: {note.techSkills}</p>
      <p className="text-14">Habilidades blandas: {note.softSkills}</p>
      <p className="text-14">
        <i>&quot; {note.comment} &quot;</i>
      </p>
    </div>
  );
}

export default CandidateClientNote;
