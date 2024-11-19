"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { useRouter } from "next/navigation";



function Page() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData): Promise<{ message: string; route: string }> => {
    const result = await handleCreateCompany(formData);

    if (result.message.startsWith("Company created successfully")) {
      // Redirige a la página de compañías
      router.push("/company");
    }

    // Devuelve el resultado en el formato esperado
    return {
      message: result.message,
      route: "/company",
    };
  };

  const fields: FormInputsRow = [
    { label: "Logo", type: "file", name: "logo" },
    {
      label: "Nombre",
      placeholder: "Nombre de la empresa",
      type: "text",
      name: "name",
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada al cliente",
      type: "textarea",
    },
    [
      { type: "cancel", value: "Cancelar", href: "/company" },
      { type: "submit", value: "Guardar" },
    ],
  ];

  return <Modal rows={fields} onSubmit={handleSubmit} />;
}

export default Page;

