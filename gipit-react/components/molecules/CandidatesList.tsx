"use client";
import { useAppContext } from "@/contexts/AppContext";
import InnerListTabs from "../organisms/InnerListTabs";

function CandidatesList() {
  // Accede al valor de las variables almacenadas en contexto
  const { showCandidates, candidatesTabs } = useAppContext();

  console.log('Candidatos a listar ->',candidatesTabs);
  if (candidatesTabs && showCandidates) {//
    return (
      <div className="title-n-list-container">
        <p className="text-14 list-heading"> Tus candidatos </p>
        <InnerListTabs
          tabs={candidatesTabs}
          paramToCheck="candidateId" // Asegúrate de que este valor esté presente en `params`
        />
      </div>
    );
  }
}

export default CandidatesList;
