"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { fetchProcessDetails } from "@/app/actions/fetchProcess";
import { updateProcess } from "@/app/actions/updateProcess";
import { toast } from "react-toastify";
import { z } from "zod";
import Loader from "@/components/atoms/Loader";
import { useSession } from "next-auth/react";

const processSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  jobOffer: z
    .string()
    .min(1, "La vacante es obligatoria")
    .regex(/^[A-Za-zÀ-ÿ0-9 .-]+$/, {
      message:
        "La vacante solo puede contener letras, números, espacios, puntos y guiones",
    }),
});

function Page() {
  const { processId } = useParams();
  const [previousValues, setPreviousValues] = useState<FormInputsRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const isReadOnlyUser = session?.user?.role === "client" || session?.user?.role === "Cliente-Gerente";

  useEffect(() => {
    if (processId) {
      const processIdStr = Array.isArray(processId) ? processId[0] : processId;

      const fetchDetails = async () => {
        try {
          const details = await fetchProcessDetails(parseInt(processIdStr));
          if (!details || !details.jobOffer) {
            setError(
              "No se encontró la oferta de trabajo para el ID del proceso."
            );
            return;
          }

          // Si es cliente, mostrar solo vista
          if (isReadOnlyUser) {
            setPreviousValues([
              {
                label: "Vacante",
                type: "text-display",
                name: "jobOffer",
                defaultValue: details.jobOffer,
                height: "40svh",
              },
              [
                {
                  type: "cancel",
                  value: "Cerrar",
                  href: `/process/${processIdStr}`,
                }
              ],
            ]);
          } 
          // Si no es cliente, mostrar formulario editable
          else {
            setPreviousValues([
              {
                label: "Nombre del Proceso",
                type: "text",
                name: "name",
                defaultValue: details.name,
                placeholder: "Ingrese el nombre del proceso",
              },
              {
                label: "Descripción de la Vacante",
                type: "textarea",
                name: "jobOffer",
                defaultValue: details.jobOffer,
                placeholder: "Describa el puesto de trabajo",
                height: "40svh",
              },
              [
                {
                  type: "cancel",
                  value: "Cancelar",
                  href: `/process/${processIdStr}`,
                },
                { type: "submit", value: "Guardar" },
              ],
            ]);
          }
        } catch (error) {
          console.error("Error fetching process details:", error);
          setError("Error al obtener los detalles del proceso.");
        }
      };

      fetchDetails();
    }
  }, [processId, isReadOnlyUser]);

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <a href={`/process/${processId}`}>Volver</a>
      </div>
    );
  }

  if (!previousValues) {
    return <div><Loader /></div>;
  }

  const handleSubmit = async (formData: FormData) => {
    // Si es cliente, no hacemos nada
    if (isReadOnlyUser) {
      return {
        message: "",
        route: `/process/${processId}`,
        statusCode: 200
      };
    }

    // Si no es cliente, procesamos la actualización
    try {
      const formObj = Object.fromEntries(formData.entries());
      const parsedData = processSchema.safeParse(formObj);

      if (!parsedData.success) {
        parsedData.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return {
          message: "Validación fallida",
          route: `/process/${processId}`,
          statusCode: 500,
        };
      }

      const result = await updateProcess(formData, processId as string);

      if (result.message.startsWith("Proceso actualizado exitosamente")) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      return { message: result.message, route: "/process", statusCode: 200 };
    } catch {
      toast.error("Error al procesar la solicitud");
      return {
        message: "Error al procesar la solicitud",
        route: `/process/${processId}`,
        statusCode: 500,
      };
    }
  };

  return (
    <Modal
      rows={previousValues}
      onSubmit={handleSubmit}
      title={isReadOnlyUser ? "Detalles de la Vacante" : "Editar Proceso"}
      validationSchema={isReadOnlyUser ? undefined : processSchema}
    />
  );
}

export default Page;