"use client";
import { useState, useEffect } from "react";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import LoaderNewCandidate from "@/components/atoms/LoaderNewCandidate";
import { handleCreateNewProfesional } from "@/app/actions/handleCreateNewProfesional";

// Tipos de datos para las compañías y jefaturas
interface Company { 
  id: number;
  name: string;
  managements: Management[];
}
// Tipos de datos para las jefaturas
interface Management {
  id: number;
  name: string;
}
// Componente principal para crear un nuevo profesional
export default function Page() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [managements, setManagements] = useState<Management[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  // Obtener lista de compañías
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const result = await fetchListCompanies();
        setCompanies(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        setError(`Error al obtener la lista de compañías: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanies();
  }, []);

  // Actualizar jefaturas cuando se selecciona una compañía
  useEffect(() => {
    if (selectedClientId) {
      const selectedCompany = companies.find(
        (company) => company.id === selectedClientId
      );
      setManagements(selectedCompany?.managements || []);
    } else {
      setManagements([]);
    }
  }, [selectedClientId, companies]);

  // Opciones de compañías
  const companyOptions = [
    { name: "Seleccionar Compañía", value: "" },
    ...companies.map((company) => ({
      name: company.name,
      value: company.id,
    }))
  ];

  // Opciones de jefaturas
  const managementOptions = [
    { name: "Selecciona una jefatura", value: "" },
    ...managements.map((management) => ({
      name: management.name,
      value: management.id,
    }))
  ];

  // Función para manejar el envío del formulario
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const cvProcessResult = await handleCreateNewProfesional(formData);
      if (!cvProcessResult.success) {
        throw new Error(cvProcessResult.message);
      }

      // Determinar el estado inicial basado en la fecha de término
      const endDate = formData.get("end_date");
      const initialStatus = endDate ? "activo" : "desvinculado";

      // Datos del candidato
      const candidateData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        jsongpt_text: cvProcessResult.jsongpt_text,
        total_experience: parseInt(formData.get("total_experience") as string),
        stage: "activo",
        management_id: parseInt(formData.get("management_id") as string),
        start_date: formData.get("start_date") ? (() => {
          const date = new Date(formData.get("start_date") as string);
          date.setDate(date.getDate() + 2);
          date.setHours(12, 0, 0);
          return date.toISOString();
        })() : null,
        end_date: endDate ? (() => {
          const date = new Date(endDate as string);
          date.setDate(date.getDate() + 2);
          date.setHours(12, 0, 0);
          return date.toISOString();
        })() : null,
        position: formData.get("position"),
        rate: parseFloat(formData.get("rate") as string),
        status: initialStatus,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el profesional');
      }

      router.push('/pros');
      return {
        message: 'Profesional creado exitosamente',
        route: '/pros',
        statusCode: 200
      };

    } catch (error) {
      console.error('Error completo:', error);
      return {
        message: error instanceof Error ? error.message : 'Error al crear el profesional',
        route: '/pros',
        statusCode: 500
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Campos del formulario
  const fields: FormInputsRow = [
    {
      label: "Nombre*",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Cargo*",
      placeholder: "Cargo del Profesional",
      type: "text",
      name: "position",
      required: true,
    },
    {
      label: "Compañía*",
      placeholder: "Seleccionar compañía",
      type: "select",
      name: "company",
      options: companyOptions,
      onChange: (e) => {
        if (e.target instanceof HTMLSelectElement) {
          setSelectedClientId(Number(e.target.value));
        }
      },
      required: true,
    },
    {
      label: "Jefatura*",
      placeholder: "Seleccionar jefatura",
      type: "select",
      name: "management_id",
      options: managementOptions,
      required: true,
    },
    {
      label: "Dirección*",
      placeholder: "Ingrese la dirección",
      type: "text",
      name: "address",
      required: true,
    },
    [
      {
        label: "Fecha de inicio*",
        placeholder: "Fecha de inicio",
        type: "date",
        name: "start_date",
        required: true,
      },
      {
        label: "Fecha de término",
        placeholder: "Fecha de término (opcional)",
        type: "date",
        name: "end_date",
        required: false,
      }
    ],
    {
      label: "Valor HH*",
      placeholder: "Valor hora",
      type: "number",
      name: "rate",
      required: true,
    },
    [
      {
        label: "Correo electrónico*",
        placeholder: "correo",
        type: "email",
        name: "email",
        required: true,
      },
      {
        label: "Teléfono*",
        placeholder: "teléfono",
        type: "text",
        name: "phone",
        required: true,
      },
      {
        label: "Años de experiencia*",
        placeholder: "Años de experiencia",
        type: "number",
        name: "total_experience",
        required: true,
      }
    ],
    {
      label: "Adjuntar CV*",
      type: "file",
      name: "cv",
      required: true,
    },
    [
      { type: "cancel", value: "Cancelar", href: "/pros" },
      { type: "submit", value: "Guardar" },
    ],
  ];

// Formato de fecha para el calendario de react-datepicker


  if (isLoading) return <LoaderNewCandidate />;
  if (error) return <div className="text-red-500">{error}</div>;

  // Renderizar el modal con los campos y la función de envío
  return (
    <>
      {isSubmitting && <LoaderNewCandidate />}
      <Modal
        rows={fields}
        onSubmit={handleSubmit}
        title="Nuevo Profesional"
      />
    </>
  );
}
