"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { updateCompany } from "@/app/actions/updateCompany";
import { useState, useEffect } from "react";
import { z } from "zod";

function Page() {
  const params = useParams();
  const companyId = Array.isArray(params.companyId)
    ? params.companyId[0]
    : params.companyId;

  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState<{
    name: string;
    description: string;
    logo: File | null;
  }>({
    name: "",
    description: "",
    logo: null,
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!companyId) {
          throw new Error("ID de compañia invalido");
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}`
        );
        if (!response.ok) {
          throw new Error("error recuperando información de la compañia");
        }
        const data = await response.json();
        setCompanyData({
          name: data.name || "",
          description: data.description || "",
          logo: data.logo || null,
        });
      } catch (error) {
        console.error("error recuperando información de la compañia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) {
    return <p>Cargando información de la compañía...</p>;
  }

  const companySchema = z.object({
    logo: z.instanceof(File).optional(),
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
      label: "Logo",
      type: "file",
      name: "logo",
    },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
      defaultValue: companyData.name,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
      defaultValue: companyData.description,
    },
    [
      { type: "cancel", value: "Cancelar", href: "/company" },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => updateCompany(formData, companyId!)}
      validationSchema={companySchema}
    />
  );
}

export default Page;
