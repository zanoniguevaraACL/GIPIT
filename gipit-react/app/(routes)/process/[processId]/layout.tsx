"use client";

import ProcessHeading from "@/components/molecules/ProcessHeading";
import { fetchProcessCandidates, fetchProcessDetails } from "@/app/actions/fetchProcess";
import stage1 from "@/src/stage1.webp";
import stage2 from "@/src/stage2.webp";
import stage3 from "@/src/stage3.webp";
import stage4 from "@/src/stage4.webp";
import React, { useEffect, useState } from "react";
import ClientProvider from "@/contexts/ClientProvider";
import ProcessInternalHeading from "@/components/molecules/ProcessInternalHeading";
import { fetchAllCandidateProcesses } from "@/app/actions/fetchProcessDataDB";
// import { fetchProcessDetails } from "@/app/actions/fetchProcessDetails";
import { NextRequest } from "next/server";
import { fetchProcessDetails } from "@/app/actions/fakeApi";

// Define the types for Proceso and Candidate
type Proceso = {
  id: number;
  name: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  status: string;
  candidatesIds: number[];
  jobOffer: string | null;
  stage: string;
  isInternal: boolean;
};

type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongptText: string;
};

export default function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { processId: string } }>) {
  const { processId } = params;

  // Use proper types for state
  const [proceso, setProceso] = useState<Proceso | null>(null); 
  const [candidatesTabs, setCandidatesTabs] = useState<Candidate[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (processId) {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          const procesoData = await fetchProcessDetails(Number(processId));  
          if (procesoData) {
            setProceso(procesoData);
  
            if (procesoData.id) {
              const candidatesTabsData = await fetchProcessCandidates(procesoData.id); 
              setCandidatesTabs(candidatesTabsData ?? []); 
            } else {
              setCandidatesTabs([]); 
            }
          } else {
            setError("Proceso no encontrado");
          }
        } catch {
          setError("Error llamando información del proceso");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  }, [processId]);
  
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!proceso) {
    return <div>No se encontró información</div>;
  }

  const etapasToUse: { name: string; showCandidates: boolean; status: string }[] = [];
  let description: { title: string; image: string; text: string } = { title: "", image: "", text: "" };
  let showCandidates: number = -1;

  const etapas = [
    {
      name: "Reclutamiento",
      order: 0,
      showCandidates: false,
      image: stage1.src,
      text: "En esta etapa identificamos y atraemos a los mejores talentos...",
    },
    {
      name: "Filtrado ACL",
      order: 1,
      showCandidates: false,
      image: stage2.src,
      text: "En esta etapa revisamos cuidadosamente a los candidatos...",
    },
    {
      name: "Entrevistas",
      order: 2,
      showCandidates: true,
      image: stage3.src,
      text: "En esta etapa facilitamos un espacio para que conozcas a los candidatos...",
    },
    {
      name: "Selección",
      order: 3,
      showCandidates: true,
      image: stage4.src,
      text: "Tras el proceso de entrevistas y evaluaciones, te presentamos al candidato ideal...",
    },
  ];

  etapas.forEach((et) => {
    if (et.name.toLowerCase() === proceso.stage.toLowerCase()) {
      etapas.forEach((e) => {
        if (et.order === e.order) {
          etapasToUse[e.order] = { name: e.name, showCandidates: e.showCandidates, status: "active" };
        } else if (et.order > e.order) {
          etapasToUse[e.order] = { name: e.name, showCandidates: e.showCandidates, status: "done" };
        } else {
          etapasToUse[e.order] = { name: e.name, showCandidates: e.showCandidates, status: "toDo" };
        }
      });
      description = { title: et.name, image: et.image, text: et.text };
      showCandidates = et.showCandidates ? proceso.candidatesIds[0] : -1;
    }
  });

  return (
    <div className="inner-page-container">
      {proceso && proceso.isInternal ? (
        <ProcessInternalHeading process={proceso} etapasToUse={etapasToUse} />
      ) : (
        <ProcessHeading
          process={proceso}
          etapasToUse={etapasToUse}
          description={description}
        />
      )}

      <ClientProvider showCandidates={showCandidates} candidatesTabs={candidatesTabs}>
        {children}
      </ClientProvider>
    </div>
  );
}
