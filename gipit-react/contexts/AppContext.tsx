'use client'
import { fetchProcessDetails } from "../app/actions/fetchProcessDetails";
import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";

type CandidateTab = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongptText: string;
  match?: number;
  stage?: string;
  root?: string;
  selected?: boolean;
};

type AppContextType = {
  showCandidates?: number; // Hacer que showCandidates sea opcional
  candidatesTabs?: {
    name: string;
    id?: number | string;
    root?: string;
    selected?: boolean;
    match?: number; // lo usaremos para mostrar el por ciento de compatibilidad y al mismo tiempo como bandera para saber si es un tab de compañia o de candidato, porque las compañias no tienen compatibilidad.
    stage?: string;
  }[]; // Hacer que candidatesIds sea opcional
  updateCandidatesTabs: (tabs: CandidateTab[], processId: number) => void;  
  refreshCandidates: (processId: number, stage?: string) => Promise<void>;
  resetCandidates: () => void; // Método para reiniciar estado
  isLoadingCandidates: boolean; // Agregar estado de carga
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
  initialShowCandidates?: number; // Hacer opcional
  initialCandidatesTabs?: CandidateTab[]; // Cambiar a Candidate[]
};



export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialShowCandidates = -1, // Valor por defecto
  initialCandidatesTabs = [], // Valor por defecto
}) => {
  const [showCandidates, setShowCandidates] = useState(initialShowCandidates);
  const [candidatesTabs, setCandidatesTabs] = useState<CandidateTab[]>(initialCandidatesTabs);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false); // Estado inicial de carga


  const updateCandidatesTabs = (tabs: CandidateTab[], processId: number) => {
    console.log(`Actualizando candidatesTabs para el proceso ${processId}:`, tabs);
    setCandidatesTabs(tabs);
    setIsLoadingCandidates(false); // Indicar que la carga ha terminado
  };

  const refreshCandidates = useCallback(async (processId: number, stage?: string) => {
    // setIsLoadingCandidates(true); // Iniciar carga
    // Usa fetchProcessDetails para obtener detalles del proceso
    const processDetails = await fetchProcessDetails(processId);

    if (processDetails && Array.isArray(processDetails.candidates)) {
      // Actualiza solo los candidatos del proceso actual
      let updatedCandidates = processDetails?.candidates;
      // filtra por etapas en cada refresh
      if (stage) {
        updatedCandidates = updatedCandidates.filter(
          (candidate) => candidate.stage === stage
        );

        setCandidatesTabs(updatedCandidates); 
      }
    } else {
      setCandidatesTabs([]);
    }
      // setIsLoadingCandidates(false); // Indicar que la carga ha terminado
  }, []);


  // Asegúrate de reiniciar los candidatos cuando cambie el proceso
  const resetCandidates = useCallback(() => {
    setCandidatesTabs([]);
    setShowCandidates(-1);
  }, []);

  return (
    <AppContext.Provider
    value={{
      showCandidates,
      candidatesTabs,
      updateCandidatesTabs,
      refreshCandidates,
      isLoadingCandidates,
      resetCandidates, // Método para reiniciar el estado
    }}
    >
      <>
      {children}
      </>
    </AppContext.Provider>
  );
};
