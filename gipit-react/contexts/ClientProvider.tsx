// src/components/providers/ClientProvider.tsx
"use client";

import React from "react";
import { AppProvider } from "@/contexts/AppContext";


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


type ClientProviderProps = {
  children: React.ReactNode;
  showCandidates?: number; // Prop opcional
  candidatesTabs?: CandidateTab[]; // Cambiar a Candidate[]
};

export default function ClientProvider({
  children,
  showCandidates = -1, // Valor por defecto
  candidatesTabs = [], // Valor por defecto
}: ClientProviderProps) {
  return (
    <AppProvider
      initialShowCandidates={showCandidates}
      initialCandidatesTabs={candidatesTabs}
    >
      {children}
    </AppProvider>
  );
}
