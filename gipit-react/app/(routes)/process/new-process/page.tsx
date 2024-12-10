"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateProcess } from "@/app/actions/handleCreateProcess";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import { toast } from "react-toastify";
import { z } from "zod";

const processSchema = z.object({
  client: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Selecciona un cliente válido",
    }),
  jobOffer: z
    .string()
    .min(1, "El perfil buscado es obligatorio")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "El perfil solo puede contener letras, números, espacios, puntos y guiones",
    }),
  jobOfferDescription: z
    .string()
    .min(1, "La descripción de la vacante es obligatoria")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "La descripción solo puede contener letras, números, espacios, puntos y guiones",
    }),
});

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
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <a href="/process">Volver</a>
      </div>
    );
  }

  const selectFieldOptions = clientsList.map((client) => ({
    name: client.name,
    value: client.id,
  }));

  const handleSubmit = async (
    formData: FormData
  ): Promise<{ message: string; route: string; statusCode: number }> => {
    try {
      const formObj = Object.fromEntries(formData.entries());

      const parsedData = processSchema.safeParse(formObj);

      if (!parsedData.success) {
        parsedData.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return {
          message: "validación fallida",
          route: "/process/new",
          statusCode: 500,
        };
      }

      const result = await handleCreateProcess(formData);

      if (result.message.startsWith("Proceso creado exitosamente")) {
        toast.success(result.message);
      } else {
        toast.success(result.message);
      }

      return { message: result.message, route: "/process", statusCode: 200 };
    } catch {
      toast.error("Error al procesar la solicitud");
      return {
        message: "Error al procesar la solicitud",
        route: "/process",
        statusCode: 500,
      };
    }
  };

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

  return <Modal rows={fields} onSubmit={handleSubmit} title="Nuevo Proceso" />;
};

export default Page;
