
// "use client";
// import Modal from "@/components/molecules/Modal";
// import { FormInputsRow } from "@/app/lib/types";
// import { useParams } from "next/navigation"; // Importa useParams para obtener el companyId
// import { updateCompany } from "@/app/actions/updateCompany";

// function Page() {
//   const { companyId } = useParams(); // Obtiene companyId desde la URL

//   // Asegúrate de que companyId sea un string
//   const id = Array.isArray(companyId) ? companyId[0] : companyId;

//   const fields: FormInputsRow = [
//     { label: "Logo", type: "file", name: "logo" },
//     {
//       label: "Nombre",
//       placeholder: "Nombre de la empresa",
//       type: "text",
//       name: "name",
//     },
//     {
//       label: "Descripción",
//       name: "description",
//       placeholder: "Alguna nota relacionada al cliente",
//       type: "textarea",
//     },
//     [
//       { type: "cancel", value: "Cancelar", href: "/company" },
//       { type: "submit", value: "Guardar" },
//     ],
//   ];

//   // Llama a updateCompany pasando formData y companyId
//   return <Modal rows={fields} onSubmit={(formData) => updateCompany(formData, id!)} />;
// }

// export default Page;

"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { updateCompany } from "@/app/actions/updateCompany";
import { useState, useEffect } from "react";

function Page() {
  const params = useParams();
  const companyId = Array.isArray(params.companyId) ? params.companyId[0] : params.companyId;

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
          throw new Error("Invalid companyId");
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/company/${companyId}`);
        if (!response.ok) {
          throw new Error("Error fetching company data");
        }
        const data = await response.json();
        setCompanyData({
          name: data.name || "",
          description: data.description || "",
          logo: null, // El logo será subido como archivo
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) {
    return <p>Cargando información de la compañía...</p>;
  }

  const fields: FormInputsRow = [
    { 
      label: "Logo", 
      type: "file", 
      name: "logo" 
    },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
      defaultValue: companyData.name, // Valor predeterminado
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
      defaultValue: companyData.description, // Valor predeterminado
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
    />
  );
}

export default Page;
