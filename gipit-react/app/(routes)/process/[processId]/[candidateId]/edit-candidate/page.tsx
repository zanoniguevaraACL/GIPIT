"use client";
import ModalWithTextEditor from "@/components/molecules/ModalWithTextEditor";
import { FormInputsRow } from "@/app/lib/types";
import { handleEditCandidate } from "@/app/actions/handleEditCandidate";
import { useState, useEffect } from "react";
import "@/components/molecules/textEditor.css";
import { fetchCandidateDetails } from "@/app/actions/fetchCandidateDetails";

type CandidateDetails = {
  name: string;
  match: number;
  email: string;
  phone: string;
  address: string;
  sumary: string;
  techSkills: string;
  softSkills: string;
  clientNote: {
    comment: string;
  };
};

export default function Page({
  params,
}: {
  params: { processId: string; candidateId: string };
}) {
  const [candidateDetails, setCandidateDetails] =
    useState<CandidateDetails | null>(null);
  const { processId, candidateId } = params;
  const routeToRedirect = `/process/${processId}/${candidateId}`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchCandidateDetails(parseInt(candidateId));
        setCandidateDetails(details);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchDetails();
  }, [candidateId]);

  if (!candidateDetails) {
    return <div>Loading...</div>;
  }

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
      defaultValue: candidateDetails.name,
    },
    {
      label: "Teléfono",
      placeholder: "+56 000 00000",
      type: "text",
      name: "phone",
      defaultValue: candidateDetails.phone,
    },
    {
      label: "Correo electrónico",
      placeholder: "correo@server.com",
      type: "email",
      name: "email",
      defaultValue: candidateDetails.email,
    },
    {
      label: "Dirección",
      placeholder: "# Calle, Ciudad, País",
      type: "text",
      name: "address",
      defaultValue: candidateDetails.address,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  return (
    <div className="main-container">
      <ModalWithTextEditor
        rows={fields}
        onSubmit={handleEditCandidate}
        title="Editar Candidato"
        cvCandidato={candidateDetails.sumary || "Escribe tu contenido aqui..."} // enviar contenido al modal
      />
    </div>
  );
}
