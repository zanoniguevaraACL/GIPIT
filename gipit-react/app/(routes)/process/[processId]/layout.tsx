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
  const isInternal: boolean = false; // logica por el rol de la sesion

  const etapas = [
    {
      name: "Reclutamiento",
      order: 0,
      showCandidates: false,
      image: stage1.src,
      text: "En esta etapa identificamos y atraemos a los mejores talentos con las habilidades y experiencia que tu empresa necesita. Analizamos a fondo cada perfil, asegurándonos de que los candidatos preseleccionados estén alineados con los requisitos técnicos y la cultura de tu empresa.",
    },
    {
      name: "Filtrado ACL",
      order: 1,
      showCandidates: false,
      image: stage2.src,
      text: "En esta etapa revisamos cuidadosamente a los candidatos que han superado el reclutamiento inicial, evaluando sus habilidades técnicas y su alineación con la cultura y valores de tu empresa. Solo los mejores talentos avanzan a la siguiente etapa.",
    },
    {
      name: "Entrevistas",
      order: 2,
      showCandidates: true,
      image: stage3.src,
      text: "En esta etapa facilitamos un espacio para que conozcas a los candidatos y evalúes tanto sus habilidades técnicas como su ajuste cultural. Nuestro equipo estará presente para resolver tus dudas y asegurar que se cumplan tus expectativas.",
    },
    {
      name: "Selección",
      order: 3,
      showCandidates: true,
      image: stage4.src,
      text: "Tras el proceso de entrevistas y evaluaciones, te presentamos al candidato ideal, con un resumen de sus habilidades y compatibilidad con tu equipo. Facilitamos los pasos finales para asegurar una integración fluida y efectiva en tu empresa.",
    },
  ];

  // variables del proceso para renderizar datos
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
  const candidatesTabs = await fetchProcessCandidates(process.candidatesIds);

  etapas.forEach((et) => {
    // recorremos las etapas de base de arriba
    if (et.name.toLowerCase() === process.stage.toLowerCase()) {
      /* cuando encontremos la etapa activa iniciamos otro loop para 
      asignar "toDo" | "active" | "done" giandonos por si es mayor o 
      menor el order asignado.*/
      etapas.forEach((e) => {
        if (et.order === e.order) {
          // esta es la activa
          etapasToUse[e.order] = {
            name: e.name,
            showCandidates: e.showCandidates,
            status: "active",
          };
        } else if (et.order > e.order) {
          // estas son las pasadas
          etapasToUse[e.order] = {
            name: e.name,
            showCandidates: e.showCandidates,
            status: "done",
          };
        } else {
          // estas son las futuras
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
        candidatesTabs={candidatesTabs}
      >
        {children}
      </ClientProvider>
    </div>
  );
}