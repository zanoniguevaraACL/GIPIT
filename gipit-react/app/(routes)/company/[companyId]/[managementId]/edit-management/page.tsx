
"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { updateManagement } from "@/app/actions/updateManagement";
import { useState, useEffect } from "react";

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
        console.error("error al recuperar información de las jefaturas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagementData();
  }, [managementId]);

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
    />
  );
}

export default Page;
