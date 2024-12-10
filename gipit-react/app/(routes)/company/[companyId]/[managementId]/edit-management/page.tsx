"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { updateManagement } from "@/app/actions/updateManagement";
import { useState, useEffect } from "react";
import { z } from "zod";

function Page({
  params,
}: {
  params: { companyId: string; managementId: string };
}) {
  const { companyId, managementId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [managementData, setManagementData] = useState({
    name: "",
    description: "",
  });

  const routeToRedirect = `/company/${companyId}`;

  useEffect(() => {
    const fetchManagementData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/management/${managementId}`
        );
        if (!response.ok) {
          throw new Error("error al recuperar información de las jefaturas");
        }
        const data = await response.json();
        setManagementData({
          name: data.name || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error(
          "error al recuperar información de las jefaturas:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagementData();
  }, [managementId]);

  const managementSchema = z.object({
    name: z
      .string()
      .min(3, "El nombre debe tener mínimo 3 caracteres")
      .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
        message:
          "El nombre solo puede contener letras, números, espacios, puntos y guiones",
      }),
    description: z
      .string()
      .min(3, "La descripción debe tener mínimo 3 caracteres")
      .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
        message:
          "La descripción solo puede contener letras, números, espacios, puntos y guiones",
      }),
  });

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre de la jefatura",
      type: "text",
      name: "name",
      defaultValue: managementData.name,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada a la jefatura",
      type: "textarea",
      defaultValue: managementData.description,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  if (isLoading) {
    return <p>Cargando la información de la jefatura...</p>;
  }

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) =>
        updateManagement(
          formData,
          managementId.toString(),
          companyId.toString()
        )
      }
      validationSchema={managementSchema}
    />
  );
}

export default Page;
