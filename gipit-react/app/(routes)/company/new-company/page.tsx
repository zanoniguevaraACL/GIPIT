"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleCreateCompany } from "@/app/actions/handleCreateCompany";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const companySchema = z.object({
  logo: z.instanceof(File).optional(),
  name: z
    .string()
    .min(1, "El nombre de la empresa es obligatorio")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message: "El nombre solo puede contener letras, números, espacios, puntos y guiones",
    }),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message: "La descripción solo puede contener letras, números, espacios, puntos y guiones",
    }),
});

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData): Promise<{ message: string; route: string }> => {
    try {
      const formObj = Object.fromEntries(formData.entries());
      const parsedData = companySchema.safeParse(formObj);

      if (!parsedData.success) {
        parsedData.error.errors.forEach(error => {
          toast.error(error.message); 
        });
        return { message: "validación fallida", route: "/company/new-company" };
      }

      setLoading(true);

      formData.delete("logo");

      const result = await handleCreateCompany(formData);

      if (result.message.startsWith("Compañia creada exitosamente")) {
        toast.success(result.message); 
        router.push(result.route);
      } else {
        toast.error(result.message); 
      }

      setLoading(false);
      return result;
    } catch {
      toast.error("Error al procesar la solicitud"); 
      setLoading(false);
      return { message: "Error al procesar la solicitud", route: "/company/new-company" };
    }
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

  return (
    <div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <Modal rows={fields} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Page;
