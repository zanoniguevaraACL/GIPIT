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
import { useRouter } from "next/navigation"; 

export default function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { processId: string } }>) {
  const { processId } = params;

  const [process, setProcess] = useState<any>(null); 
  const [candidatesTabs, setCandidatesTabs] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (processId) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const processData = await fetchProcessDetails(1); 
          if (processData) {
            setProcess(processData); 

            if (processData.candidatesIds && processData.candidatesIds.length > 0) {
              const candidatesTabsData = await fetchProcessCandidates(processData.candidatesIds); 
              setCandidatesTabs(candidatesTabsData); 
            } else {
              setCandidatesTabs([]); 
            }
          } else {
            setError("Process not found"); 
          }
        } catch (err) {
          setError("Error fetching process data"); 
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

  if (!process) {
    return <div>No se encontró información</div>;
  }

  // Variables for rendering
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
    if (et.name.toLowerCase() === process.stage.toLowerCase()) {
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
      showCandidates = et.showCandidates ? process.candidatesIds[0] : -1;
    }
  });

  return (
    <div className="inner-page-container">
      {process && process.isInternal ? (
        <ProcessInternalHeading process={process} etapasToUse={etapasToUse} />
      ) : (
        <ProcessHeading
          process={process}
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
