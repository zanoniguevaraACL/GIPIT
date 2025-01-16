'use client'
import "./candidateDetails.css";
import CandidateClientNote from "../molecules/CandidateClientNote";
import Button from "../atoms/Button";
import { fetchCandidateDetails } from "@/app/actions/fetchCandidateDetails";
import { useEffect, useState } from "react";
import Loader from "../atoms/Loader";
import { useSession } from "next-auth/react";

type CandidateDetails = {
  name: string;
  match: number;
  email: string;
  phone: string;
  address: string;
  sumary: string;
  techSkills: string;
  softSkills: string;
  clientNote: {
    comment: string;
  };
  stage: string; // Nuevo campo para la etapa
  total_experience: number;
};


function CandidateDetails({
  id,
  processId,
}: {
  id: number;
  processId: number;
}) {
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails | null>(null);
  const [loading, setLoading] = useState(true); // Cambia a true para mostrar el Loader inicial
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCandidateDetails(id);
        console.log("En CanidateDetails.tsx Candidato encontrado:--->",data);
        setCandidateDetails(data);
      } catch (error) {
        console.error("Error al obtener detalles del candidato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!candidateDetails) {
    return <p>No se encontraron detalles del candidato.</p>;
  }

  const stage = candidateDetails?.stage; // Obtén la etapa actual del candidato
  // console.log("En CanidateDetails.tsx Candidato encontrado:--->",data);
  const isInternal = ["admin", "kam"].some(palabra => session?.user?.role == palabra);


  return (
    <div className="candidate-details-container">
      <h3>{candidateDetails.name}</h3>
      <div className="experience-n-match-container">
        <p className="text-14">{candidateDetails.total_experience ? candidateDetails.total_experience : 'No se especifica en el CV '} año/s de experiencia (valor aproximado)</p>
        <div className="vertical-separator"></div>
        <p className="text-14">
          {candidateDetails.match}% de compatibilidad <i>(calculado con IA)</i>
        </p>
      </div>
      <div className="details-block">
        <div dangerouslySetInnerHTML={{ __html: candidateDetails.sumary }} className="text-content-display"></div>
        {/* <p className="text-14">{data.sumary}</p> */}
      </div>
      {/* <div className="details-block">
        <h4>Habilidades Técnicas</h4>
        <p className="text-14">{candidateDetails.techSkills}</p>
      </div>
      <div className="details-block">
        <h4>Habilidades Blandas</h4>
        <p className="text-14">{candidateDetails.softSkills}</p>
      </div> */}
      {candidateDetails.clientNote && (
        <CandidateClientNote note={candidateDetails.clientNote} isInternal={isInternal} />
      )}
      <div className="buttons-container">
      {stage !== "descartado" && (
        <Button
          text="Descartar Candidato"
          href={`/process/${processId}/${id}/disqualify`}
          type="secondary"
        />
         )}

        <div className="right-buttons-container">
          {!isInternal ? (
            <Button
              text={candidateDetails.clientNote ? "Editar Nota" : "Crear Nota"}
              href={`/process/${processId}/${id}/${
                candidateDetails.clientNote ? "edit-note" : "new-note"
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

          {stage !== "seleccionado" && (
          <Button
            text="Seleccionar Candidato"
            href={`/process/${processId}/${id}/hire`}
            type="primary"
          />
          )}

          {stage ==="seleccionado" && (
                    <Button
                      text="Regresar a Entrevistas"
                      href={`/process/${processId}/${id}/return-to-interviews`}
                      type="secondary"
                    />
                  )}
            {stage === "descartado" && (
                    <Button
                      text="Regresar a Entrevistas"
                      href={`/process/${processId}/${id}/return-to-interviews`}
                      type="secondary"
                    />
                  )}
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
