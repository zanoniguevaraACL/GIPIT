// src/components/providers/ClientProvider.tsx
"use client";

import React from "react";
import { AppProvider } from "@/contexts/AppContext";

type ClientProviderProps = {
  children: React.ReactNode;
  showCandidates?: number; // Prop opcional
  candidatesTabs?: {
    name: string;
    id?: number | string;
    root?: string;
    selected?: boolean;
    match?: number;
  }[]; // Prop opcional
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
