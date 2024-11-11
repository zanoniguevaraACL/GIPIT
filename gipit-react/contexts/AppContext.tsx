import React, { createContext, useContext, ReactNode } from "react";

type AppContextType = {
  showCandidates?: number; // Hacer que showCandidates sea opcional
  candidatesTabs?: {
    name: string;
    id?: number | string;
    root?: string;
    selected?: boolean;
    match?: number; // lo usaremos para mostrar el por ciento de compatibilidad y al mismo tiempo como bandera para saber si es un tab de compañia o de candidato, porque las compañias no tienen compatibilidad.
  }[]; // Hacer que candidatesIds sea opcional
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
  initialCandidatesTabs?: {
    name: string;
    id?: number | string;
    root?: string;
    selected?: boolean;
    match?: number; // lo usaremos para mostrar el por ciento de compatibilidad y al mismo tiempo como bandera para saber si es un tab de compañia o de candidato, porque las compañias no tienen compatibilidad.
  }[]; // Hacer opcional
};

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialShowCandidates = -1, // Valor por defecto
  initialCandidatesTabs = [], // Valor por defecto
}) => {
  return (
    <AppContext.Provider
      value={{
        showCandidates: initialShowCandidates,
        candidatesTabs: initialCandidatesTabs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
