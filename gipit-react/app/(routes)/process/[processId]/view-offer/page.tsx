"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { updateProcess } from "@/app/actions/updateProcess";
import { fetchProcessDetails } from "@/app/actions/fetchProcess";
import { toast } from "react-toastify";
import { z } from "zod";
import Loader from "@/components/atoms/Loader";

const processSchema = z.object({
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
  const [previousValues, setPreviousValues] = useState<FormInputsRow | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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
          setPreviousValues([
            {
              label: "Vacante",
              placeholder: "Describa el puesto de trabajo",
              type: "textarea",
              name: "jobOffer",
              defaultValue: details.jobOffer,
              height: "40svh",
            },
            [
              {
                type: "cancel",
                value: "Cerrar",
                href: `/process/${processIdStr}`,
              },
              { type: "submit", value: "Guardar" },
            ],
          ]);
        } catch (error) {
          console.error("Error fetching process details:", error);
          setError("Error al obtener los detalles del proceso.");
        }
      };

      fetchDetails();
    }
  }, [processId]);

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
      title="Detalles de la Vacante"
    />
  );
}

export default Page;
