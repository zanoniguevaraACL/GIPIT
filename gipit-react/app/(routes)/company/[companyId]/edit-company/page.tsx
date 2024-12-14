"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { updateCompany } from "@/app/actions/updateCompany";
import { useState, useEffect } from "react";
import { companySchema } from "@/app/lib/validationSchemas";
import Loader from "@/components/atoms/Loader";

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
      { type: "cancel", value: "Cancelar", href: `/company/${companyId}` },
      { type: "submit", value: "Guardar" },
    ],
  ];

  if (loading) return <Loader />;

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => updateCompany(formData, companyId!)}
      validationSchema={companySchema}
    />
  );
}

export default Page;
