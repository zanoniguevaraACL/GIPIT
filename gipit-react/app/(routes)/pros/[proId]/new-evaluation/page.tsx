'use client'

import Modal from "@/components/molecules/Modal";
import { FormInputsRow, FormResponse } from "@/app/lib/types";
import { updateProfessionalEvaluation } from "@/app/actions/createProfessionalEvaluation";
import { fetchProfessionalDetails } from "@/app/actions/fetchProfessionalDetails";

export default function Page({ params }: { params: { proId: string } }) {
 
  const { proId } = params;
  const routeToRedirect = `/pros/${proId}`;

  const handleSubmit = async (formData: FormData): Promise<FormResponse> => {
    try {
      console.log('Iniciando envío del formulario');
      
      const details = await fetchProfessionalDetails(proId);
      console.log('Detalles completos del profesional:', details);
      
      const managementId = parseInt(proId);
      
      if (isNaN(managementId)) {
        console.error('ID inválido:', proId);
        throw new Error('ID inválido');
      }

      const evaluationData = {
        candidate_management_id: managementId,
        eval_stack: parseFloat(formData.get('eval_stack') as string) || 0,
        eval_comunicacion: parseFloat(formData.get('eval_comunicacion') as string) || 0,
        eval_motivacion: parseFloat(formData.get('eval_motivacion') as string) || 0,
        eval_cumplimiento: parseFloat(formData.get('eval_cumplimiento') as string) || 0,
        date: new Date(formData.get('date') as string).toISOString(),
        benefit: formData.get('benefit') as string || '',
        client_comment: formData.get('client_comment') as string || '',
        acciones_acl: formData.get('acciones_acl') as string || '',
        proyecction: formData.get('proyecction') as string || ''
      };

      console.log('Datos de evaluación a enviar:', evaluationData);
      console.log('Verificando candidate_management_id:', evaluationData.candidate_management_id);
      
      const response = await updateProfessionalEvaluation(proId, evaluationData);
      console.log('Respuesta de la actualización:', response);
      
      return {
        message: 'Evaluación guardada con éxito',
        route: routeToRedirect,
        statusCode: 200
      };
      
    } catch (error) {
      console.error('Error al procesar la evaluación:', error);
      return {
        message: 'Error al procesar la evaluación',
        route: routeToRedirect,
        statusCode: 500
      };
    }
  };

  const fields: FormInputsRow = [
    {
      label: "Fecha",
      placeholder: "Fecha de evaluación",
      type: "text",
      name: "date",
      value: new Date().toISOString().split('T')[0],
    },
    [
      {
        label: "Dominio del stack tecnológico",
        placeholder: "Número de 0-7",
        type: "number",
        name: "eval_stack",
        minMax: [0, 7],
        step: "0.1", // Permite decimales
      },
      {
        label: "Habilidades de comunicación",
        placeholder: "Número de 0-7",
        type: "number",
        name: "eval_comunicacion",
        minMax: [0, 7],
        step: "0.1",
      },
    ],
    [
      {
        label: "Responsabilidad y cumplimiento",
        placeholder: "Número de 0-7",
        type: "number",
        name: "eval_cumplimiento",
        minMax: [0, 7],
        step: "0.1",
      },
      {
        label: "Proactividad y motivación",
        placeholder: "Número de 0-7",
        type: "number",
        name: "eval_motivacion",
        minMax: [0, 7],
        step: "0.1",
      },
    ],
    [
      {
        label: "Beneficios",
        placeholder: "Beneficios del profesional",
        type: "textarea",
        name: "benefit",
      },
      {
        label: "Comentarios del cliente",
        placeholder: "Comentarios del cliente",
        type: "textarea",
        name: "client_comment",
      },
    ],
    [
      {
        label: "Acciones ACL",
        placeholder: "Acciones realizadas",
        type: "textarea",
        name: "acciones_acl",
      },
      {
        label: "Proyección",
        placeholder: "Proyección del profesional",
        type: "textarea",
        name: "proyecction",
      },
    ],
    [
      { 
        type: "cancel", 
        value: "Cancelar", 
        href: routeToRedirect, 
        name: "cancel_button"
      },
      { 
        type: "submit", 
        value: "Guardar Evaluación", 
        name: "submit_button"
      },
    ],
  ];

  return (
    <Modal
      rows={fields}
      onSubmit={handleSubmit}
      title="Nueva Evaluación"
    />
  );
}
