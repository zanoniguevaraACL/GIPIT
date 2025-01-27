'use client';

import React, { useState, useEffect } from 'react';
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import Loader from "@/components/atoms/Loader";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import { handleCreateNewProfesional } from "@/app/actions/handleCreateNewProfesional";


type Company = {
  id: number;
  name: string;
};

export default function Page() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCompanies = async () => {
      setIsLoading(true);
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

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const companyOptions = [
    { name: "Seleccionar Compañía", value: "" },
    ...companies.map((company) => ({
      name: company.name,
      value: company.id,
    }))
  ];

  const handleSubmit = async (formData: FormData) => {
    try {
      const cvProcessResult = await handleCreateNewProfesional(formData);
      if (!cvProcessResult.success) {
        throw new Error(cvProcessResult.message);
      }

      // Se crea el candidato con el jsongpt_text procesado
      const candidateData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        jsongpt_text: cvProcessResult.jsongpt_text,
        total_experience: parseInt(formData.get("total_experience") as string),
        stage: "activo"
      };

      console.log('Datos del candidato a crear:', candidateData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Error al crear el candidato');
      }

      const result = await response.json();
      console.log('Respuesta de creación de candidato:', result);

      if (!result.candidate?.id) {
        throw new Error('No se pudo obtener el ID del candidato creado');
      }

      // Se crea la relación con management
      const managementData = {
        candidate_id: result.candidate.id,
        management_id: parseInt(formData.get('management_id') as string),
        status: 'activo',
        start_date: new Date(formData.get('start_date') as string).toISOString(),
        end_date: new Date(formData.get('end_date') as string).toISOString(),
        position: formData.get('position') as string,
        rate: parseFloat(formData.get('rate') as string)
      };

      console.log('Datos de management a crear:', managementData);

      if (!managementData.start_date || !managementData.end_date || !managementData.position || !managementData.rate) {
        throw new Error('Todos los campos de management son requeridos');
      }

      const managementResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidate_management`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(managementData)
      });

      if (!managementResponse.ok) {
        const managementError = await managementResponse.json();
        console.error('Error en management:', managementError);
        
        // Si falla la creación de management, eliminamos el candidato creado
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${result.candidate.id}`, {
          method: 'DELETE'
        });
        throw new Error(`Error al crear la relación con management: ${managementError.message || 'Error desconocido'}`);
      }

      return {
        message: 'Profesional creado exitosamente',
        route: '/pros',
        statusCode: 200
      };

    } catch (error) {
      console.error('Error completo:', error);
      return {
        message: error instanceof Error ? error.message : 'Error al crear el candidato',
        route: '/pros',
        statusCode: 500
      };
    }
  };

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Cargo",
      placeholder: "Cargo del Profesional",
      type: "text",
      name: "position",
      required: true,
    },
    {
      label: "Compañía",
      placeholder: "Seleccionar compañía",
      type: "select",
      name: "management_id",
      options: companyOptions,
      required: true,
    },
    {
      label: "Dirección",
      placeholder: "Ingrese la dirección",
      type: "text",
      name: "address",
      required: true,
    },
    [
      {
        label: "Fecha de inicio",
        placeholder: "Fecha de inicio",
        type: "date",
        name: "start_date",
        required: true,
      },
      {
        label: "Fecha de término",
        placeholder: "Fecha de término",
        type: "date",
        name: "end_date",
        required: true,
      }
    ],
    [
      {
        label: "Valor HH",
        placeholder: "Valor hora",
        type: "number",
        name: "rate",
        required: true,
      },
      {
        type: "text",
        name: "status",
        defaultValue: "activo",
        label: "Estado"
      },
    ],
    [
      {
        label: "correo electrónico",
        placeholder: "correo",
        type: "text",
        name: "email",
        required: true, 
      },
      {
        label: "teléfono",
        placeholder: "teléfono",
        type: "number",
        name: "phone",
        required: true, 
      },
      {
        label: "Años de experiencia",
        placeholder: "Años de experiencia",
        type: "number",
        name: "total_experience",
        required: true,
      }
    ],
    {
      label: "Adjuntar CV",
      type: "file", 
      name: "cv",
      required: true,
    },
    [
      { type: "cancel", value: "Cancelar", href: "/pros" },
      { type: "submit", value: "Guardar" },
    ],
  ];  

  return (
    <Modal
      rows={fields}
      onSubmit={handleSubmit}
      title="Nuevo Profesional"
    />
  );
}