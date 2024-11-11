import { IconBulb } from "@tabler/icons-react";
import "./candidateClientNote.css";

function CandidateClientNote({
  note,
}: {
  note: { tech: number; soft: number; comment: string };
}) {
  return (
    <div className="client-note-container">
      <div className="note-header">
        <h4>Tus Apuntes</h4>
        <IconBulb />
      </div>
      <p className="text-14">Conocimientos técnicos: {note.tech}</p>
      <p className="text-14">Habilidades blandas: {note.soft}</p>
      <p className="text-14">
        <i>&quot; {note.comment} &quot;</i>
      </p>
    </div>
  );
}

export default CandidateClientNote;
