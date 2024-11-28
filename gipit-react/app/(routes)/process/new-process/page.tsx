"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateProcess } from "@/app/actions/handleCreateProcess";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";

type Client = {
  id: number;
  name: string;
};

const Page = () => {
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchListCompanies();
        setClientsList(data);
      } catch (error) {
        if (error instanceof Error) {
          setError("Error al obtener la lista de compañías: " + error.message);
        } else {
          setError("Error al obtener la lista de compañías.");
        }
      } finally {
        setIsLoading(false); 
      }
    };

    getClients(); 
  }, []); 

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const selectFieldOptions = clientsList.map((client) => ({
    name: client.name,
    value: client.id,
  }));

  const fields: FormInputsRow = [
    {
      label: "Cliente",
      placeholder: "Seleccionar cliente",
      type: "select",
      name: "client",
      options: selectFieldOptions,
    },
    {
      label: "Perfil buscado",
      placeholder: "Perfil buscado",
      type: "text",
      name: "jobOffer",
    },
    {
      label: "Descripción de la vacante",
      name: "jobOfferDescription",
      placeholder: "Descripción de la vacante",
      type: "textarea",
      height: "40svh",
    },
    [
      { type: "cancel", value: "Cancelar", href: "/process" },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal rows={fields} onSubmit={handleCreateProcess} title="Nuevo Proceso" />
  );
};

export default Page;
