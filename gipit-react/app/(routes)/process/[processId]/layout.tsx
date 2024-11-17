import ProcessHeading from "@/components/molecules/ProcessHeading";
import ProcessInternalHeading from "@/components/molecules/ProcessInternalHeading";
import ClientProvider from "@/contexts/ClientProvider";
import { fetchProcessDetails, fetchProcessCandidates } from "@/app/actions/fetchProcess";
import stage1 from "@/src/stage1.webp";
import stage2 from "@/src/stage2.webp";
import stage3 from "@/src/stage3.webp";
import stage4 from "@/src/stage4.webp";

type Etapa = {
  name: string;
  order: number;
  showCandidates: boolean;
  image: string;
  text: string;
};

type ProcessDetails = {
  id: number;
  name: string;
  stage: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  status: string;
  candidatesIds: number[];
  jobOffer: string;
};

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  // Fetch process details from the server
  const process = await fetchProcessDetails(1); // Replace with dynamic ID if needed
  if (!process) {
    return <div>Error loading process details.</div>;
  }

  const isInternal: boolean = true; // Logic for internal user role

  // Define stages (etapas)
  const etapas: Etapa[] = [
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
      text: "Tras el proceso de entrevistas y evaluaciones...",
    },
  ];

  // Set up the etapasToUse array based on the current stage
  const etapasToUse: { name: string; showCandidates: boolean; status: string }[] = [];
  let description = { title: "", image: "", text: "" };
  let showCandidates = -1;

  // Fetch the candidates based on the process's candidates IDs
  const candidatesTabs = await fetchProcessCandidates(process.candidatesIds);

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
      {isInternal ? (
        <ProcessInternalHeading process={process} etapasToUse={etapasToUse} />
      ) : (
        <ProcessHeading process={process} etapasToUse={etapasToUse} description={description} />
      )}

      <ClientProvider showCandidates={showCandidates} candidatesTabs={candidatesTabs}>
        {children}
      </ClientProvider>
    </div>
  );
}
