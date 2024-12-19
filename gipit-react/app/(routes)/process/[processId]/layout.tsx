"use client";
import ProcessHeading from "@/components/molecules/ProcessHeading";
import stage1 from "@/src/stage1.webp";
import stage2 from "@/src/stage2.webp";
import stage3 from "@/src/stage3.webp";
import stage4 from "@/src/stage4.webp";
import React from "react";
import ClientProvider from "@/contexts/ClientProvider";
import ProcessInternalHeading from "@/components/molecules/ProcessInternalHeading";
import { fetchProcessDetails } from "@/app/actions/fetchProcessDetails";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/atoms/Loader";

// Define the types for Proceso and Candidate
type Proceso = {
  id: number;
  name: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: Candidate[];
  status: string;
  jobOffer?: string; // Hacerlo opcional
  stage: string;
};

type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongptText: string;
  match?: number;
};

export default function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { processId: string } }>) {

    const { data: session } = useSession();

  const { processId } = params;
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
            setCandidatesTabs(procesoData.candidates ?? []); // Asigna directamente los candidatos del proceso
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
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!proceso) {
    return <div>No se encontró información</div>;
  }

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
  let showCandidates: Candidate | number = -1;
  // const candidatesTabs = process.candidatesIds.length > 0
  //   ? await Promise.all(process.candidatesIds.map(async (candidateId) => {
  //       const candidates = await fetchProcessCandidates(candidateId);
  //       return candidates ? candidates.map(candidate => ({
  //         name: candidate.name,
  //         id: candidate.id,
  //       })) : [];
  //     })).then(results => results.flat())
  //   : [];

  const candidatesTabsFinal = candidatesTabs ?? [];

  etapas.forEach((et) => {
    if (et.name.toLowerCase() === proceso.stage.toLowerCase()) {
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
      description = { title: et.name, image: et.image, text: et.text };
      showCandidates =
        et.showCandidates && proceso.candidates.length > 0
          ? proceso.candidates[0]
          : -1;
    }
  });

  //ADMIN O KAM
  const isInternal = ["admin", "kam"].some(palabra => session?.user?.role == palabra);

  return (
    <div className="inner-page-container">
      {isInternal ? (
        <ProcessInternalHeading process={proceso} etapasToUse={etapasToUse} />
      ) : (
        <ProcessHeading
          process={proceso}
          etapasToUse={etapasToUse}
          description={description}
        />
      )}

      <ClientProvider
        showCandidates={showCandidates}
        candidatesTabs={candidatesTabsFinal}
      >
        {children}
      </ClientProvider>
    </div>
  );
}
