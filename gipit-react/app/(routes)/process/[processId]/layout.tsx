import ProcessHeading from "@/components/molecules/ProcessHeading";
import {fetchProcessCandidates,fetchProcessDetails} from "@/app/actions/fetchProcess";
import stage1 from "@/src/stage1.webp";
import stage2 from "@/src/stage2.webp";
import stage3 from "@/src/stage3.webp";
import stage4 from "@/src/stage4.webp";
import React from "react";
import ClientProvider from "@/contexts/ClientProvider";
import ProcessInternalHeading from "@/components/molecules/ProcessInternalHeading";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const process = await fetchProcessDetails(1);

  if (!process) {
    return (
      <div className="inner-page-container">
        <p>Process not found</p>
      </div>
    );
  }

  const isInternal: boolean = false;

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

  const etapasToUse: {
    name: string;
    showCandidates: boolean;
    status: string;
  }[] = [];
  let description: {
    title: string;
    image: string;
    text: string;
  } = { title: "", image: "", text: "" };
  let showCandidates: number = -1;

  if (process.candidatesIds && process.id) {
    const candidatesTabs = await fetchProcessCandidates(process.id);

    const transformedCandidatesTabs = candidatesTabs
      ? candidatesTabs.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
        }))
      : [];

    etapas.forEach((et) => {
      if (et.name.toLowerCase() === process.stage.toLowerCase()) {
        etapas.forEach((e) => {
          if (et.order === e.order) {
            etapasToUse[e.order] = {
              name: e.name,
              showCandidates: e.showCandidates,
              status: "active",
            };
          } else if (et.order > e.order) {
            etapasToUse[e.order] = {
              name: e.name,
              showCandidates: e.showCandidates,
              status: "done",
            };
          } else {
            etapasToUse[e.order] = {
              name: e.name,
              showCandidates: e.showCandidates,
              status: "toDo",
            };
          }
        });

        description = {
          title: et.name,
          image: et.image,
          text: et.text,
        };

        showCandidates = et.showCandidates ? process.candidatesIds[0] : -1;
      }
    });

    return (
      <div className="inner-page-container">
        {isInternal ? (
          <ProcessInternalHeading process={process} etapasToUse={etapasToUse} />
        ) : (
          <ProcessHeading
            process={process}
            etapasToUse={etapasToUse}
            description={description}
          />
        )}

        <ClientProvider
          showCandidates={showCandidates}
          candidatesTabs={transformedCandidatesTabs} 
        >
          {children}
        </ClientProvider>
      </div>
    );
  }

  return (
    <div className="inner-page-container">
      <p>Process details not found or candidates are missing.</p>
    </div>
  );
}
